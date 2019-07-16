module.exports = (nav, map) => {
    let swap = (a,b) => {
        a.style.display = "none"
        b.style.display = "flex "
    }

    if ((nav.style.display != "none" && map.style.display != "none") || map.style.display != "none") 
        { swap(map, nav) }

    else { swap(nav, map) }   
}