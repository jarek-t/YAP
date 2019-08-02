import os, sys, re, csv, json, requests, time

class YapDataReadier:
    geocodingURL = "https://us1.locationiq.com/v1/search.php"
    orgIndex = {
        "Reproductive Justice": "repJustic",
        "Sexual & Domestic Violence": "sVil",
        "Environmental Protction": "envProtection",
        "Arts & Creative Expression": "artsExpr",
        "Criminal Justice Reform": "cjReform",
        "Mental Health Awareness": "mhAwareness",
        "Immigration Access": "immAccess",
        "Ending LGBTQ+ Discrimination": "lgbtq"
    }
    keyIndex = {}

    orgs = {
        "repJustic": {},
        "sVil": {},
        "envProtection": {},
        "artsExpr": {},
        "cjReform": {},
        "mhAwareness": {},
        "immAccess": {},
        "lgbtq": {}
    }
    passionIndex = {}

    def splitAddress(self, address, out):
        onlyCity = re.findall(r'(?<=\\N\/A\s\()\w+', address)

        if onlyCity: out["addr1"] = onlyCity[0]
            
        else:
            addrList = re.split(r"(\,|-)", address)

            if len(addrList) == 5:
                out["addr0"] = False
                out["addr1"] = addrList[0]
                out["addr2"] = addrList[-3] + addrList[-2] + addrList[-1]

            
            elif len(addrList) == 7:
                out["addr0"] = addrList[0]
                out["addr1"] = addrList[2][1:]
                out["addr2"] = addrList[-3] + addrList[-2] + addrList[-1]
            
            else:
                out["addr0"] = out["addr1"] = out["addr2"] = False
    
    def getAddress(self, query):
        data = {
            'key': '3da6488b6abe32',
            'q': query,
            'format': 'json'
        }

        resp = json.loads((requests.get(self.geocodingURL, params = data)).text)

        lat = resp[0]['lat']
        lon = resp[0]['lon']

        return lat, lon

    def getPid(self, attrs):
        pId = ''

        if attrs['phone'] != 'N/A':
            pId =  pId.join(re.findall(r'\d+', attrs['phone']))
        else:
            pId += 'NA-'+pId.join([w[0:2] for w in attrs["name"].split(' ')])

        attrs["id"] = pId

        return pId

    def parseSource(self, data):
        next(data)

        # Name 0- Category 1- Street Address 2- Phone Number 3- Link 4
        for row in data:
            targetIndex = self.orgs[self.orgIndex[row[1]]]

            toQuery = re.findall(r'(?<=-\s).+', row[2])
            toQuery = toQuery if toQuery else re.findall(r'(?<=\\N\/A\s\()\w+', row[2])
            toQuery = toQuery if toQuery else row[2]
            
            coords = self.getAddress(toQuery)
            

            attrs = {
                "name": row[0],
                "link": row[4],
                "phone": row[3],
                "coords": {"lat": coords[0], "lon": coords[1]}
            }
            self.splitAddress(row[2], attrs)

            pId = self.getPid(attrs)#re.findall(row[3])
            # attrs["id"] = pId

            targetIndex[pId] = attrs
            
            time.sleep(.5) # Our geocoding API has a request rest period

    def makeKeyIndex(self, orgIndex = False):
        orgIndex = orgIndex if orgIndex else self.orgIndex

        for key in orgIndex:
            self.keyIndex[orgIndex[key]] = key

    def makeOrgIndex(self):
        for cat in self.orgs:
            info = { "id": cat, "name": self.keyIndex[cat], "orgs": []}
            orgList = info["orgs"]

            for org in self.orgs[cat]:
                orgInfo = (self.orgs[cat])[org]

                if orgInfo: 
                    orgList.append( { "name": orgInfo['name'], "id": orgInfo['id'] } )

            if not len(orgList):
                orgList.append({"name": "test", "id": "_test"})

            self.passionIndex[info["id"]] = info
    def finish(self):
        fn = './passions.json'

        with open(fn, 'w') as passionsOut:
            json.dump(self.orgs, passionsOut)
        print('Passions exported to ' + fn + '\n')

        with open('./index.json', 'w') as indexOut:
            json.dump(self.passionIndex, indexOut)
        print('Index exported to ' + fn + '\n')

        print('...Done!')

    def __init__(self, csvPath):
        self.makeKeyIndex()

        print('Parsing ' + csvPath + '...' + '\n')
        with open(csvPath, 'r') as yapFile:
            yapImporter = csv.reader(yapFile)
            
            self.parseSource(yapImporter)

        self.makeOrgIndex()

        self.finish()

        
        
        



        

test = YapDataReadier('./yapPartners.csv')




    
