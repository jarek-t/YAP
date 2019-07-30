import './scss/main.scss'

const getHeader = require('./js/util/getHeader')
const map = require('./js/classes/map')

let args = {
    'passionContainerId': 'mapWrap',
    'passionNavClass': '.pickYourPassionOpt',

    'mapArgs': {
        'containerID': 'mapWrap',
        'layerSrc': 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
        'layerArgs': {
            attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
            minZoom: 1,
            maxZoom: 19
        } 
    }
}

var passionMap = new map(args)
var headerObj = getHeader.default

console.log(passionMap)
console.log(headerObj)

