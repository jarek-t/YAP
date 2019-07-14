import './scss/main.scss'

const headerClass = require('./js/header')
const mapCoordinator = require('./js/map')

var headerObj = headerClass.default
var passionMap = new mapCoordinator("passion")
console.log(headerObj)

