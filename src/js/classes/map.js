
const getMap = require('../util/getMap.js')

class mapCoordinator {
    constructor(args) {        
        this.map = getMap(args['passionContainerId'])
        
        let initOpts = {}
        // ^ debugging

        document.querySelectorAll(args['passionNavClass']).forEach(opt => {
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