'use strict'

function onInit() {
    renderSavedMemes()
}

function renderSavedMemes() {
    var strHtml = '';
    for (var i = 1; i <= loadFromStorage('numOfSaveImg'); i++) {
        var meme = loadFromStorage(`meme${i}`);
        strHtml += `<img class="gallery-img" data-id="${i}" onclick="selectImg(this)" src="${meme[1]}" alt="">`
    }
    var elContainer = document.querySelector('.saved-memes-container');
    elContainer.innerHTML = strHtml;
    
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
  }