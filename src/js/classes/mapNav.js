const getMapNav = require('../util/getMapNav')
const getMapMetaNav = require('../util/getMapMetaNav')
const mapNavItems = require('../data/navInfo.json')

class mapNav {
    constructor(args) {
        let main = this
        this.map = args['map']
        this.mapNavContainer = args['container']

        let type = args['initialType'] // for testing

        let navItems = mapNavItems
        this.navOpts = navItems
        this.mapMetaNav = getMapMetaNav(type, main)
        this.mapNav = getMapNav(navItems, main, type)

        this.mapNavContainer.appendChild(this.mapMetaNav)
        this.mapNavContainer.appendChild(this.mapNav)

        this.currentlySelected = false
        this.activePassionWindow = this.mapMetaNav.lastChild

        
        this.defautlHeader = 'Pick Your Passion'
        this.headerObj = document.getElementById('mapNavHeader')

        if (type) { this.makeActive(type) }
    }

    back() {
        this.map.toggle()
        
        this.deselectAll()   
    }

    makeActive(passionTypeId) {
        this.deselectAll()

        if (this.currentlySelected) this.mapNav.appendChild(this.currentlySelected)

        let targetItemId = passionTypeId + "Wrap"        
        
        this.currentlySelected = document.getElementById(targetItemId)
        console.log(this.currentlySelected)
        this.headerObj = this.currentlySelected.firstChild.firstChild.innerHTML
        this.activePassionWindow.innerHTML = ''
        this.activePassionWindow.appendChild(this.currentlySelected.lastChild)
        
    }   

    readNavOpts(source) {
        Object.keys(source).forEach(pId => {
            passionList.appendChild(makePassion(navItems[pId]))
        })
    }  

    
    // moveToFront(passionWrap) {
    //     this.activePassionWindow.innerHTML = ''
    //     this.activePassionWindow.appendChild(this.currentlySelected)
    // }

    deselectAll() {
        this.currentlySelected = false

        this.mapNav.firstChild.childNodes
                .forEach(p => { p.className = '' })
    }

    moveToWindow(passionWrap) {

    }

    get _navList() 
        { return this.mapNav.firstChild.childNodes }

    set _navList(newNavItems) {
        let target = this.mapNav.firstChild
        
        target.innerHTML = ''
        
        newNavItems.forEach( opt => 
            target.appendChild(opt)
        ) 
    }

}

module.exports = mapNav