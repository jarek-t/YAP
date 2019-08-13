const passion = require('./passion')

class passions {
    constructor(args) {
        this.map = args['map']
        this.passions = args['data']

        this.pId = false
        this.passionObjs = {}
    }

    get currentPassion() {
        return this.pId && this.passionObjs[this.pId] ? 
            this.passionObjs[this.pId] : false
    }

    getOrg(id) {
        /* Return's an organization's object if it's in the current passion, 
           otherwise false */
        let currentPassion = this.currentPassion
        
        console.log(currentPassion)
        return currentPassion && currentPassion[id] ? 
            currentPassion[id] : false
    }

    getPassion(pId) {
        // If we already made the passion's org objects, return them
        this.pId = pId
        let currentPassion = this.currentPassion
    
        if (currentPassion) return currentPassion
        // Otherwise, construct the individual passions into a returned list
        else {
            let passionAttrs = this.passions[pId]
            
            if (passionAttrs) {
                let markerContainer = {}

                Object.keys(passionAttrs).forEach(id => {
                    let attrs = passionAttrs[id]
        
                    let org = new passion(this.map, attrs)
                    markerContainer[org.id] = org
                })
    
                this.passionObjs[pId] = markerContainer
                return markerContainer
            }
            // Return false when no info was associated with the passion's ID
            return false
        }
    }
}

module.exports = passions