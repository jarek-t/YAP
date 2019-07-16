import './scss/main.scss'

const getHeader = require('./js/util/getHeader')
const map = require('./js/classes/map')

let args = {
    'passionContainerId': 'mapWrap',
    'passionNavClass': '.pickYourPassionOpt'
}

var passionMap = new map(args)
var headerObj = getHeader.default

console.log(passionMap)
console.log(headerObj)

