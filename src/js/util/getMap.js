const L = require('leaflet')

module.exports = (container, baseName) => {
    container.id = baseName + "container"

    let mapWrap = document.createElement('div')
    let mapWrapName = baseName + "Map"
    mapWrap.id = mapWrapName

    container.appendChild(mapWrap)

    let map = L.map(
        mapWrapName, {
        center: [42.74,-84.49],
        zoom: 5
        // minZoom: ,
        // maxZoom: ,
    })
    
    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    return map
}