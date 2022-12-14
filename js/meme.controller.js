'use strict'

let gElCanvas
let gCtx

function onInit() {
    renderGallery()
    renderMeme()
}

function renderMeme() {
    gElCanvas = document.getElementById('memeCanvas')
    gCtx = gElCanvas.getContext('2d')
    let meme = getMeme()
    drawMeme(meme)
    console.log(gImgs);
}

function drawText(text, x, y, fontSize, fontColor, txtAlign) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = `${fontColor}`
    gCtx.font = `${fontSize} Impact`;
    gCtx.textAlign = `${txtAlign}`
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function drawMeme(meme) {
    let memeId = meme.selectedImgId
    let memeTxt = meme.lines[0].txt
    let memeFontSize = meme.lines[0].size
    let memeFontColor = meme.lines[0].color
    let memeTxtAlign = meme.lines[0].align
    const elImg = new Image()
    elImg.src = `./img/meme-imgs (square)/${memeId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(memeTxt, 150,150, memeFontSize, memeFontColor, memeTxtAlign)
    }
}

function onSetLineText(value) {
    setLineTxt(value)
    renderMeme()
}

