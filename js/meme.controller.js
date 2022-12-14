'use strict'

let gElCanvas
let gCtx

function onInit() {
    renderMeme()
}

function renderMeme() {
    gElCanvas = document.getElementById('memeCanvas')
    gCtx = gElCanvas.getContext('2d')
    
}

