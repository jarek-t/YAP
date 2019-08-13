import './scss/main.scss'

const getHeader = require('./js/util/getHeader')
const map = require('./js/classes/map')

let args = {
    'passionContainerId': 'mapWrap',
    'passionNavClass': '.pickYourPassionOpt',

    'mapArgs': {
        'containerID': 'mapWrap',
        'layerSrc': 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        'layerArgs': {
            attribution: '<a href="https://www.esri.com/en-us/home">Esri</a>',
            minZoom: 7
        },
        zoom: 7,
        // minZoom: 6,
        swBound: [40.93841495689795, -97.76733398437501],
        neBound: [47.85003078545827, -77.23388671875]
        
    }
}

var passionMap = new map(args)
var headerObj = getHeader.default

console.log(passionMap)
console.log(headerObj)
