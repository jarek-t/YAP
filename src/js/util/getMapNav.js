const mapNavItems = require('../data/navInfo.json')

module.exports = (initType, navItems) => {
    navItems = navItems ? navItems : mapNavItems

    let makePassion = (passion, pId) => {
        let passionWrap = document.createElement('div')
        let passionHead = document.createElement('div')

        let temp = document.createElement('h2')
        temp.innerHTML = passion.name

        passionHead.appendChild(temp)
        passionWrap.append(passionHead)

        let passionItems = document.createElement('nav')
        passion.orgs.forEach(org => {
            temp = document.createElement('div')

            let title = document.createElement('p')
            title.innerHTML = org['name']
            title.id = org['id']

            let icon = document.createElement('i')
            icon.className = 'fas fa-chevron-circle-light'


            temp.appendChild(title)
            temp.appendChild(icon)

            passionItems.appendChild(temp)
        })
        passionWrap.appendChild(passionItems)

        passionWrap.id = pId
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