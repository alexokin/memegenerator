"use strict";

var gImgSelect;

function onInit() {
  renderSavedMemes();
}

function renderSavedMemes() {
  var strHtml = "";
  for (var i = 1; i <= loadFromStorage("numOfSaveImg"); i++) {
    var meme = loadFromStorage(`meme${i}`);
    strHtml += `<img class="gallery-img" data-id="${i}" onclick="selectImg(this)" src="${meme[1]}" alt="">`;
  }
  var elContainer = document.querySelector(".saved-memes-container");
  elContainer.innerHTML = strHtml;
}

function selectImg(selectedElImg) {
  gImgSelect = selectedElImg;
  var elImgs = document.querySelectorAll('.gallery-img');
    elImgs.forEach(img => img.classList.remove('selected'));
    selectedElImg.classList.add('selected');
}

function downloadMeme(elLink) {
    if (!gImgSelect) return;
    elLink.href = gImgSelect.src
    elLink.download = 'yourMeme';
}

function toggleMenu() {
  document.body.classList.toggle("menu-open");
}
