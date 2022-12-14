"use strict";

let gImgs;
let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I sometimes eat Falafel",
      size: "30px",
      align: "left",
      color: "#fff",
    },
  ],
};

_createImages()

function getMeme() {
  return gMeme
}

function getImgs() {
    return gImgs
}

function setLineTxt(text) {
    gMeme.lines[0].txt = text
    return gMeme.lines[0].txt 
}

function setImg(id) {
    var selectedImg = gImgs[id]
    gMeme.selectedImgId = selectedImg.id
}

function _createImages() {
  let images = [];
  for (let i = 0; i < 18; i++) {
    
    images.push(_createImage(i));
  }
  gImgs = images;
}

function _createImage(id) {
  return {
    id,
    url: `img/meme-imgs (square)/${id}.jpg`,
    keywords: ["funny", "trump"],
  };
}
