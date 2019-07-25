
const getMap = require('../util/getMap.js')
const getNavItems = require('../util/getNavItems')
const passionTransition = require('../util/passionTransition')

const mapNav = require('./mapNav')

class mapCoordinator {
    constructor(args) {        
        let main = this

        this.map = {
            'obj': getMap(args['passionContainerId']),
            'nav': document.getElementById('mapNav'),
            'container': document.getElementById('passionContainer')
        }   

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

        this.toggle()
    }

    showMap(id) {  
        this.toggle()
        
        this.mapNav.makeActive(id)
    }

    toggle() {
        let nav = this.nav.container
        let map = this.map.container

        passionTransition(nav, map)

        return true
    }
}



module.exports = mapCoordinator