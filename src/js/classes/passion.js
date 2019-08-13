class passion {
    constructor(map, attrs) {
        this.attrs = attrs

        this.icon = L.icon({
            iconUrl: '/assets/mapPin.svg',

            iconSize: [40, 60]
        })
        this.marker = L.marker(this.attrs.coords, {icon: this.icon})

        this.marker.on('click', e => map.selectOrg(this.attrs.id))

        this.info = {
            "dom": false,
            "obj": false
        }
    }

    get id() { return this.attrs.id }

    set popup(p) {
        if (p instanceof HTMLElement) {
            this.info.dom = p

            if (!this.info.obj) {
                this.marker.unbindPopup()

                this.marker.bindPopup(this.info.dom).openPopup()

                this.info.obj = this.marker.getPopup()
            }
            return true
        }
        return false
    }
    
    // get openPopup() 
    //     { return !this.info.obj ? !this.info.obj._isOpen : false }

    popupOpen() {
        if (!this.info.obj || this.info.obj._isOpen ) return false
        
        console.log(this.info.dom)
        this.marker.unbindPopup()
        this.marker.bindPopup(this.info.dom).openPopup()

        return true
    }


    
}

module.exports = passion