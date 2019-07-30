
const getMap = require('../util/getMap.js')
const getNavItems = require('../util/getNavItems')
const passionTransition = require('../util/passionTransition')
const mapNav = require('./mapNav')

class mapCoordinator {
    constructor(args) {        
        let main = this

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

        this.nav = {
            'items': getNavItems(args['passionNavClass'], main),
            'container': document.getElementById('pickYourPassionNav')
        }

        let mapNavOpts = {
            'map': main,
            'initialLocation': false,
            'container': document.getElementById('mapNav')
        }
        this.mapNav = new mapNav(mapNavOpts)

        let map = this.map.obj
        this.map.obj.on('click', e=> {
            console.log(map.getZoom())
            console.log(map.getCenter())
        })
        
        this.toggle()
    }

    showMap(id) {  
        this.toggle()
        
        this.mapNav.makeActive(id)
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
        }

        else {
            map.classList.remove('onMap')
        }

        return true
    }
}



module.exports = mapCoordinator