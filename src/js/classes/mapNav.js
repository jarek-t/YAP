const getMapNav = require('../util/getMapNav')
const getMapMetaNav = require('../util/getMapMetaNav')

class mapNav {
    constructor(args) {
        this.map = args['map']
        this.mapNavContainer = args['container']

        this.mapMetaNav = getMapMetaNav(args['initialType'])
        this.mapNav = getMapNav(args['initialType'])

        this.mapNavContainer.appendChild(this.mapMetaNav)
        this.mapNavContainer.appendChild(this.mapNav)


        this.currentlySelected = false
    }


}

module.exports = mapNav