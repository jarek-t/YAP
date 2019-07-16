module.exports = (query, main) => {
    let navItems = {}

    document.querySelectorAll(query).forEach(opt => {        
        let optListener = opt.addEventListener('click', e => { main.showMap(e)})

        navItems[opt.id] = {'obj': opt, 'listener': optListener}
    })

    return navItems
}