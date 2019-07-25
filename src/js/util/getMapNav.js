const mapNavItems = require('../data/navInfo.json')

module.exports = (navItems, main) => {
    //navItems = mapNavItems//navItems ? navItems : mapNavItems

    let makePassion = (passion, pId) => {
        let passionWrap = document.createElement('div')
        let passionHead = document.createElement('div')

        let id = passion.id

        passionHead.id = id
        passionWrap.id = id + "Wrap"

        let temp = document.createElement('h2')
        temp.innerHTML = passion.name

        passionHead.addEventListener("click", e => {
            main.makeActive(id)

            console.log('hello')
        })
        
        passionHead.appendChild(temp)
        passionWrap.append(passionHead)

        let passionItems = document.createElement('ul')
        passion.orgs.forEach(org => {
            temp = document.createElement('li')

            let title = document.createElement('p')
            title.innerHTML = org['name']
            title.id = org['id']

            let icon = document.createElement('i')
            icon.className = 'fas fa-chevron-circle-light orgSelectIndicator'

            temp.appendChild(title)
            temp.appendChild(icon)            
            
            temp.className = "passion"
            passionItems.appendChild(temp)
        })
        passionWrap.appendChild(passionItems)


        return passionWrap
    }

    let passionList = document.createElement('nav')
    passionList.id = "mapNavList"
    Object.keys(navItems).forEach(pId => {
        passionList.appendChild(makePassion(navItems[pId]))
    })

    let wrap = document.createElement('div')
    wrap.appendChild(passionList)
    wrap.id="mapNavListWrap"
    return wrap
}