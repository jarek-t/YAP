module.exports = (attrs, map) => {
    let wrap = document.createElement('div')
    wrap.id = "orgInfoWrap"

    let titleArea = document.createElement('a')
    titleArea.href = attrs.link

    titleArea.id = "titleArea"
    wrap.appendChild(titleArea)

    let title = document.createElement('h1')
    title.innerText = attrs.name

    title.id = "title"
    titleArea.appendChild(title)

    if (attrs.img) {
        let titleImage = document.createElement('img')
        img.src = attrs.img

        img.id = "titleImage"
        titleArea.appendChild(titleImage)
    }

    let infoArea = document.createElement('div')
    infoArea.id = "infoArea"
    wrap.appendChild(infoArea)

    let links = document.createElement('div')
    links.id = "orgLinks"
    infoArea.appendChild(links)

    let makeLink = (wrapId, iconId, info) => {
        let linkWrap = document.createElement('li')
        linkWrap.id = wrapId
        linkWrap.class = "infoLinkWrap"

        let icon = document.createElement('i')
        icon.className = iconId
        linkWrap.appendChild(icon)

        let infoWrap = document.createElement('span')
        infoWrap.appendChild(info)
        linkWrap.appendChild(infoWrap)

        return linkWrap
    }
    let urlInfo = document.createElement('p')
    urlInfo.innerText = attrs.link.substring(8)

    let urlLink = makeLink('urlWrap', 'fas fa-external-link-alt', urlInfo)
    links.appendChild(urlLink)


    if (attrs.phone && attrs.phone != "N/A") {
        temp = document.createElement('i')
        temp.className = 'fas fa-phone-alt'
        links.appendChild(temp)
    }

    return wrap

}