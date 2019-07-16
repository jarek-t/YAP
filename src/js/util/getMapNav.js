const mapNavItems = require('../data/navInfo.json')

module.exports = (initType, navItems) => {
    navItems = navItems ? navItems : mapNavItems

    let makePassion = (passion, pId) => {
        let passionWrap = document.createElement('ul')
        let passionHead = document.createElement('div')

        let temp = document.createElement('h2')
        temp.innerHTML = passion.name

        passionHead.appendChild(temp)
        passionWrap.append(passionHead)

        let passionItems = document.createElement('ul')
        passion.orgs.forEach(org => {
            temp = document.createElement('li')

            let title = document.createElement('h3')
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

    let passionList = document.createElement('ul')
    Object.keys(navItems).forEach(pId => {
        passionList.appendChild(makePassion(navItems[pId]))
    })

    return passionList
}