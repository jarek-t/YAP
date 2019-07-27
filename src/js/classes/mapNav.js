const getMapNav = require('../util/getMapNav')
const getMapMetaNav = require('../util/getMapMetaNav')
const mapNavItems = require('../data/navInfo.json')

class mapNav {
    constructor(args) {
        let main = this

        this.map = args['map']
        this.mapNavContainer = args['container']
        this.navOpts = mapNavItems
        
        let type = args['initialType']

        let metaNav = getMapMetaNav(type, main)
        this.mapMetaNavItems = metaNav.items

        let mapNav = getMapNav(main.navOpts, main, type)
        this.mapNavItems = mapNav.items

        this.mapNavContainer.appendChild(metaNav.wrap)
        this.mapNavContainer.appendChild(mapNav.wrap)

        this.currentlySelected = false
        
        this.defautlHeader = 'Pick Your Passion'
        this.headerObj = document.getElementById('mapNavHeader')

        if (type) this.makeActive(type) 
    }

    back() {
        let deselect = this.deselect()   

        if (deselect) this.mapMetaNavItems.head.innerHTML = 'Pick Your Passion'
            
        
        else this.map.toggle()
        
    }

    makeActive(pId) {
        this.deselect()

        this.currentlySelected = this.mapNavItems[pId]
        
        this.mapMetaNavItems.active.appendChild(this.currentlySelected.orgs)

        this.mapMetaNavItems.head.innerHTML = this.currentlySelected.name
        
        this.currentlySelected.head.classList.add('selected')
    }   

    deselect () {
        if (this.currentlySelected) {
            this.currentlySelected.head.classList.remove('selected')

            let active = this.mapMetaNavItems.active

            active.childNodes.forEach
                ( curActive => active.removeChild(curActive) )
            
            this.currentlySelected = false
            return true
        }

        return false
    }
}

module.exports = mapNav