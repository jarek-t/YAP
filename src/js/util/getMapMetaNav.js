module.exports = (title, main) => {
    let metaNavOut = { 'back': false, 'head': false, 'active': false }

    let container = document.createElement('div')
    container.id="mapMetaNavWrap"

    let wrap = document.createElement('div')
    wrap.id = "mapNavHeader"

    let back = document.createElement('i')
    back.className = 'fas fa-chevron-left fas-4x'

    metaNavOut.back = back
    back.addEventListener('click', e => {main.back()})

    let backWrap = document.createElement('div')
    backWrap.appendChild(back)
    backWrap.id = "backWrap"
    
    wrap.appendChild(backWrap)

    let head = document.createElement('h1')
    head.innerHTML = title ? title : 'Pick Your Passion'
    
    metaNavOut.head = head
    wrap.appendChild(head)

    container.appendChild(wrap)
    
    let activePassionWindow = document.createElement('div')
    activePassionWindow.id = "activePassionWindow"
    
    metaNavOut.active = activePassionWindow
    container.appendChild(activePassionWindow)

    return {'wrap': container, 'items': metaNavOut}
}