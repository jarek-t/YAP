module.exports = (title, main) => {
    let wrap = document.createElement('div')

    let back = document.createElement('i')
    back.className = 'fas fa-chevron-left'
    back.addEventListener('click', e => {main.back()})
    wrap.appendChild(back)

    let header = document.createElement('h1')
    header.innerHTML = title ? title : 'Pick Your Passion'
    wrap.appendChild(header)

    return wrap
}