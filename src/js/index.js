const map = require('classes/map.js')

let args = {
    'passionContainerId': 'mapWrap',
    'passionNavClass': '.pickYourPassionOpt'
}
const passionMap = map(args)

console.log(passionMap)