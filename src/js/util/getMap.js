const L = require('leaflet')

module.exports = args => { //containerName => {
    let map = L.map(
        args['containerID'], {
        center: [44.218374327479964,-86.06911898411354],
        zoom: 7
        // attr: 
    })
    
    L.tileLayer(args['layerSrc'], args['layerArgs']).addTo(map)

    map.attr = args['layerArgs']['attribution']
    return map
}