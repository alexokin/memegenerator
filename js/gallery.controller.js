'use strict'

function renderGallery() {
    var imgs = getImgs()
    var strHTMLs = imgs.map(img => `
    <article class="img img${img.id}"><img src="${img.url}" alt="memeImg" onclick="onImgSelect(${img.id})"></article>
    `)
    document.querySelector('.meme-gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(id) {
    setImg(id)
    renderMeme()
}