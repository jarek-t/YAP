module.exports = (title, main) => {
    let container = document.createElement('div')

    let wrap = document.createElement('div')
    let back = document.createElement('i')
    back.className = 'fas fa-chevron-left'
    back.addEventListener('click', e => {main.back()})
    wrap.appendChild(back)

    let header = document.createElement('h1')
    header.id = "mapNavHeader"
    header.innerHTML = title ? title : 'Pick Your Passion'
    wrap.appendChild(header)

    container.appendChild(document.createElement('div'))
    container.appendChild(wrap)
    container.id="mapMetaNavWrap"

    let activePassionWindow = document.createElement('div')
    activePassionWindow.id = "activePassionWindow"

    container.appendChild(activePassionWindow)

    return container
}