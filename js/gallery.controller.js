"use strict";

function renderGallery() {
  var imgs = getImgs();
  var strHTMLs = imgs.map(
    (img, idx) => `
    <article  class="img${img.id}"><img src="${img.url}" alt="galleryImg" class="gallery-img" data-memeImgIdx="${idx}" onclick="onImgSelect(this)"></article>
    `
  );
  document.querySelector(".meme-gallery").innerHTML = strHTMLs.join("");
}

function onImgSelect(elImg) {
  openEditor();
  setImg(elImg);
  renderMeme();
}

function openGallery() {
  resetMeme()
  // meme.lines[meme.selectedLineIdx].size = '30px'

  var elEditor = document.querySelector(".meme-editor");
  elEditor.classList.add("hide");
  var elGallery = document.querySelector(".meme-gallery");
  elGallery.classList.remove("hide");
  document.getElementById("memeText").value = "";
}

function openEditor() {
  var elGallery = document.querySelector(".meme-gallery");
  var elEditor = document.querySelector(".meme-editor");
  elEditor.classList.remove("hide");
  
  
  elGallery.classList.add("hide");
}

function OpenMenu() {
  document.body.classList.toggle('menu-open');
}
