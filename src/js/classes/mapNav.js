const getMapNav = require('../util/getMapNav')
const getMapMetaNav = require('../util/getMapMetaNav')

class mapNav {
    constructor(args) {
        let main = this

        this.map = args['map']
        this.mapNavContainer = args['container']

        this.mapMetaNav = getMapMetaNav(args['initialType'], main)
        this.mapNav = getMapNav(args['initialType'])

        this.mapNavContainer.appendChild(this.mapMetaNav)
        this.mapNavContainer.appendChild(this.mapNav)

        this.currentlySelected = false
    }

    back() {
        this.map.toggle()
    }


}

module.exports = mapNav