const L = require('leaflet')

module.exports = args => { //containerName => {
    let map = L.map(
        args['containerID'], {
        center: [44.5,-87.5],
        zoom: args['zoom'],
        maxZoom: args['maxZoom'],
        maxBounds: [ args['swBound'], args['neBound']]
    })
    // console.log(args)
    L.tileLayer(args['layerSrc'], args['layerArgs']).addTo(map)

    map.attr = args['layerArgs']['attribution']
    return map
}