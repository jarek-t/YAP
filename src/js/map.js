
const getMap = require('./util/getMap.js')

class mapCoordinator {
    constructor(baseName) {
        let _container = document.createElement('div')
        
        this.map = getMap(container, baseName)
        this.container = _container
        
        let initOpts = {}
        document.querySelectorAll('.pickYourPassionOpt').forEach(opt => {
            initOpts[opt.id] = opt
            
            let main = this
            opt.addEventListener('click', e => {
                main.navigate(opt.id)
            })
        })
        console.log(initOpts)
    }

    navigate(which) {
        console.log(which)
    }
}



module.exports = mapCoordinator