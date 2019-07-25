import os, sys, re, csv, json

class YapDataReadier:
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
    
    def parseSource(self, data):
        next(data)

        # Name 0- Category 1- Street Address 2- Phone Number 3- Link 4
        for row in data:
            targetIndex = self.orgs[self.orgIndex[row[1]]]

            attrs = {
                "name": row[0],
                "link": row[4],
                "phone": row[3]
            }

            self.splitAddress(row[2], attrs)
            
            targetIndex[row[3]] = attrs

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
                    orgList.append( { "name": orgInfo['name'], "id": orgInfo['phone'] } )

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




    
