'use strict'

function renderGallery() {
    var imgs = getImgs()
    var strHTMLs = imgs.map((img, idx) => `
    <article class="gallery-img img${img.id}"><img src="${img.url}" alt="galleryImg" data-memeImgIdx=${idx} onclick="onImgSelect(${img.id + 1})"></article>
    `)
    document.querySelector('.meme-gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(id) {
    openEditor()
    setImg(id)
    renderMeme()
}

function openGallery() {
    var meme = getMeme()
    meme.lines[0].txt = ''
    meme.lines[0].size = '30px'

    var elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add("hide")
    var elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.remove("hide")
    document.getElementById("memeText").value = ''

}

function openEditor() {
    var elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.add("hide")
    var elEditor = document.querySelector('.meme-editor')
    elEditor.classList.remove("hide")
}