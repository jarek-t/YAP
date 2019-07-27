const L = require('leaflet')

module.exports = containerName => {
    let map = L.map(
        containerName, {
        center: [43.761,-89.956],
        zoom: 7
        // minZoom: ,
        // maxZoom: ,
    })
    
    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
	    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
	    minZoom: 1,
	    maxZoom: 19
    }).addTo(map)

    return map
}