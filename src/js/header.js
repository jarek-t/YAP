
let createHeader = (navHTML, linkHTML, insert) => {   
    
    let ifReplace = (ifNot=false, withThis='') => { 
        ifNot = ifNot ? ifNot : withThis
        ifNot.toString().replace(/^\s+|\s+$/g, '')

        return ifNot
    }

    let generateElement = (type, innerHTML, id_) => {
        let nodeTemp = document.createElement(type)
        nodeTemp.innerHTML = innerHTML
        if (id_) 
            { nodeTemp.id = id_ }
        return nodeTemp
    }

    let htmlFallbackTemp = 
        '<ul> <li> <a href="#"> <h3>About Us</h3> </a> </li ><li> <a href="#"> <h3>For Activists</h3> </a> </li> <img src="assets/logo.svg"> <li> <a href="#"> <h3>Submissions</h3> </a> </li ><li> <a href="#"> <h3>Blog</h3> </a> </li> </ul>'        
    navHTML = ifReplace(navHTML, htmlFallbackTemp)
    var pageNav = generateElement('nav', navHTML, 'siteNav')


    if (insert)
        { document.body.appendChild(pageNav) }

    return pageNav
}

module.exports = createHeader

module.exports.default = createHeader(false, false, true)