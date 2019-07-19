import os, sys, re, csv

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



    def __init__(self, csvPath):
        with open(csvPath, 'r') as yapFile:
            yapImporter = csv.reader(yapFile)
            
            self.parseSource(yapImporter)

        print(self.orgs)


        

test = YapDataReadier('./yapPartners.csv')




    
