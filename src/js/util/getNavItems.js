module.exports = (query, main) => {
    let navItems = {}

    document.querySelectorAll(query).forEach(opt => {        
        let optListener = opt.addEventListener('click', e => { main.showMap(opt.id)})

        navItems[opt.id] = {'obj': opt, 'listener': optListener}
    })

    return navItems
}