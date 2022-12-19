"use strict";

var gImgs;
var gImgIdx = 0;
var gLineId = 0;
var gFontSize = 30;

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: gLineId,
  lines: [
    {
      lineId: gLineId,
      txt: "add text here",
      size: gFontSize,
      align: "center",
      color: "#fff",
      x: 250,
      y: 50,
      isDrag: false,
    },
  ],
};

_createImages();

function getMeme() {
  return gMeme;
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag;
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx;
  gMeme.lines[gMeme.selectedLineIdx].y += dy;
}

function changeAlign(align) {
  if (gMeme.lines.length === 1 && gMeme.lines[0].txt === '') return;
  gMeme.lines[gMeme.selectedLineIdx].align = align;
  if (align === 'end') { }
  var posX = getPosXToWrite(gMeme.selectedLineIdx);
  gMeme.lines[gMeme.selectedLineIdx].x = posX;
  renderMeme();
  
}

function getPosXToWrite(lineIdx) {
  var elCanvas = getElCanvas();
  var xPos;
  switch (gMeme.lines[lineIdx].align) {
      case 'start':
          {
              xPos = 50;
              break;
          }
      case 'center':
          {
              xPos = elCanvas.width / 2;
              break;
          }
      case 'end':
          {
              xPos = elCanvas.width - 50;
              break;
          }
  }
  gMeme.lines[lineIdx].x = xPos;
  return xPos;
}

function getImgs() {
  return gImgs;
}

function resetMeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
      {
        lineId: 0,
        txt: "add text here",
        size: gFontSize,
        align: "center",
        color: "#fff",
        x: 250,
        y: 50,
      },
    ],
  };
}

function changeTextColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function changeFontSize(diff) {
  if (gMeme.lines.length === 1 && gMeme.lines[0].txt === "") return;
  var fontSize = gMeme.lines[gMeme.selectedLineIdx].size;

  fontSize += diff;
  gMeme.lines[gMeme.selectedLineIdx].size = fontSize;
}

function changeLinesId(gMeme) {
  gMeme.lines.forEach(function (line, idx) {
    line.lineId = idx;
  });
  gLineId = gMeme.lines.length;
}

function addLineToMeme(isEmptyLines) {
  if (gMeme.lines.length === 1 && gMeme.lines[0].txt === "") return;
  var elCanvas = getElCanvas();
  var yPos =
    gMeme.lines.length === 1 ? elCanvas.height - 20 : elCanvas.height / 2;
  gMeme.lines.push({
    lineId: ++gLineId,
    txt: "",
    size: gFontSize,
    align: "center",
    color: "white",
    x: elCanvas.width / 2,
    y: yPos,
  });
  if (!isEmptyLines) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function switchLine() {
  if (gMeme.selectedLineIdx === 0)
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
  else gMeme.selectedLineIdx--;
  return gMeme.selectedLineIdx;
}

function setLineTxt(text) {
  var selectedLineIdx = gMeme.selectedLineIdx;
  gMeme.lines[selectedLineIdx].txt = text;
}

function setImg(elImg) {
  var memeImg = elImg;
  console.log(memeImg);
  gMeme.selectedImgId = +memeImg.dataset.memeimgidx;
  console.log(typeof gMeme.selectedImgId);
}

function saveMeme() {
  var numOfSaveImg = loadFromStorage('numOfSaveImg');
  if (!numOfSaveImg) {
      saveToStorage('numOfSaveImg', 1);
      numOfSaveImg = 1;
  } else {
      numOfSaveImg++;
  }
  renderMeme();
  var elCanvas = getElCanvas();
  var imgContent = elCanvas.toDataURL();
  saveToStorage(`meme${numOfSaveImg}`, [gMeme, imgContent]);
  saveToStorage('numOfSaveImg', numOfSaveImg);
  document.location.href = 'myMemes.html';
}

function _createImages() {
  gImgs = [];
  gImgs.push(_createImage(["trump", "politics", "angry"]));
  gImgs.push(_createImage(["dog", "cute", "animal"]));
  gImgs.push(_createImage(["cute", "baby", "dog"]));
  gImgs.push(_createImage(["cat", "sleeping", "cute"]));
  gImgs.push(_createImage(["baby", "success", "cute"]));
  gImgs.push(_createImage(["aliens", "history", "man"]));
  gImgs.push(_createImage(["surprised", "cute", "baby"]));
  gImgs.push(_createImage(["wonka", "willy", "smile"]));
  gImgs.push(_createImage(["evil", "boy", "laugh"]));
  gImgs.push(_createImage(["obama", "laugh", "funny"]));
  gImgs.push(_createImage(["two men", "boxers", "close"]));
  gImgs.push(_createImage(["echt", "tv show", "good"]));
  gImgs.push(_createImage(["leo", "actor", "cheers"]));
  gImgs.push(_createImage(["matrix", "morpheus", "classic"]));
  gImgs.push(_createImage(["one does", "not", "lotr"]));
  gImgs.push(_createImage(["star trek", "laugh", "classic"]));
  gImgs.push(_createImage(["putin", "russia", "politics"]));
  gImgs.push(_createImage(["toy story", "buzz", "lightyear"]));
}

function _createImage(keywords) {
  return {
    id: gImgIdx++,
    url: `img/meme-imgs (square)/${gImgIdx}.jpg`,
    keywords,
  };
}
