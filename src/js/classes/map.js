
const getMap = require('../util/getMap.js')
const getNavItems = require('../util/getNavItems')
const getOrgBubble = require('../util/getOrgBubble')
const passionTransition = require('../util/passionTransition')

const mapNav = require('./mapNav')
const passionHandler =  require('./passions')

const passionData = require('../data/passionInfo.json')

class mapCoordinator {
    constructor(args) {        
        let main = this
        
        // Get the class we'll use to return org info
        let passionHandlerOpts = {
            'data': passionData,
            'map': main
        }
        this.passionHandler = new passionHandler(passionHandlerOpts)

        // Set up our actual map
        this.map = {
            'obj': getMap(args['mapArgs']),
            'nav': document.getElementById('mapNav'),
            'container': document.getElementById('passionContainer')
        }

        // Add the required/given attribution to our map container
        this.map.container.removeChild(this.map.container.lastChild)
        let attr = document.createElement('aside')

        attr.innerHTML = 'Basemaps provided by' + this.map.obj.attr
        attr.lastChild.target = '_blank'
        attr.id = "BasemapAttribution"
        this.map.container.lastChild.appendChild(attr)

        // Get the main page's nav options
        this.nav = {
            'items': getNavItems(args['passionNavClass'], main),
            'container': document.getElementById('pickYourPassionNav')
        }   
        console.log(this.nav.items)

        // Set up the map navigation window
        let mapNavOpts = {
            'map': main,
            'initialLocation': false,
            'container': document.getElementById('mapNav')
        }
        this.mapNav = new mapNav(mapNavOpts)

        // Set the site to the default view        
        this.toggle()

        this.map.obj.on('click', e => console.log(this.map.obj.getBounds()))
        
    }

    showMap(pId) {  
        this.toggle()
        
        this.mapNav.makeActive(pId)
    }

    toggle() {
        let nav = this.nav.container
        let map = this.map.container

        let scrollOffset = document.getElementById('siteNav').offsetHeight
        let makeFullPage = passionTransition(nav, map)

        if (makeFullPage) {
            map.classList.add('onMap')
            map.scrollIntoView(true)

            window.scrollBy(0, -scrollOffset)
            this.map.obj.invalidateSize()
        }
        else  map.classList.remove('onMap')
    }

    makeActive(pId) {
        let map = this.map.obj

        // Remove the old passion's markers if they exist
        let oldPassion = this.passionHandler.currentPassion

        if (oldPassion) Object.keys(oldPassion).forEach(
            id => map.removeLayer(oldPassion[id].marker) )
        
        // Add the new selection to the map
        let passion = this.passionHandler.getPassion(pId)
        
        if (passion) {
            Object.keys(passion).forEach(id => 
                passion[id].marker.addTo(map) )

            return true
        }
        return false
    }

    selectOrg(id) {
        let org = this.passionHandler.getOrg(id)

        if (org) {
            let isOpen = org.popupOpen()

            if (!isOpen)
                org.popup = getOrgBubble(org.attrs)

            return true
        }   
        return false
    }

    passionImage(pId) {
        return this.nav.items[pId].img
    }
}



module.exports = mapCoordinator