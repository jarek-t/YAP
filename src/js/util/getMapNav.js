const mapNavItems = require('../data/navInfo.json')

module.exports = (navItems, main) => {
    let navOut = {}

    let makePassion = (passion) => {
        let id = passion.id
        
        let passionHead = document.createElement('div')
        passionHead.id = id

        console.log(main)
        let logo = main.map.passionImage(id)
        console.log(logo)
        passionHead.appendChild(logo)

        let title = document.createElement('h2')
        title.innerHTML = passion.name
        passionHead.appendChild(title)

        passionHead.addEventListener("click", e => main.makeActive(id) )
        
        let passionItems = document.createElement('ul')

        passion.orgs.forEach(org => {
            let passion = document.createElement('li')
            passion.id = org['id']

            let title = document.createElement('p')
            title.innerHTML = org['name']
            // title.id = 

            let icon = document.createElement('i')
            icon.className = 'fas fa-chevron-right fas-2x'

            passion.appendChild(title)
            passion.appendChild(icon)            
            passionItems.appendChild(passion)

            passion.addEventListener('click', e => main.selectOrg(passion.id))
        })

        return {'head': passionHead, 'orgs': passionItems, 'name': passion.name, 'id': passion.id}
    }

    let passionList = document.createElement('nav')
    passionList.id = "mapNavList"

    Object.keys(navItems).forEach(pId => {
        let passion = makePassion(navItems[pId])
        
        passionList.appendChild(passion.head)
        
        navOut[pId] = (passion)
    })

    let wrap = document.createElement('div')
    wrap.id="mapNavListWrap"
    wrap.appendChild(passionList)

    return {'wrap': wrap, 'items': navOut}
}