"use strict";

var gImgs;
var gImgIdx = 0;
var gLineId
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      lineId: 0,
      txt: "add text here",
      size: "30px",
      align: "center",
      color: "#fff",
      x:150,
      y:50,
    },
  ],
};

_createImages();

function getMeme() {
  return gMeme;
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
        size: "30px",
        align: "center",
        color: "#fff",
        x:150,
        y:50,
      },
    ],
  };
}

function changeTextColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function changeFontSize(diff) {
  if (gMeme.lines.length === 1 && gMeme.lines[0].txt === '') return;
  // gMeme.lines[gMeme.selectedLineIdx].size += diff;
  var fontSizeStr = gMeme.lines[gMeme.selectedLineIdx].size;
  var fontSizeNum = +fontSizeStr.slice(0, 2);
  fontSizeNum += diff
  gMeme.lines[gMeme.selectedLineIdx].size = `${fontSizeNum.toString()}px`;


  // console.log("increase font");
  
  // var incNum = ++fontSizeNum;
  // gMeme.lines[gMeme.selectedLineIdx].size = `${incNum.toString()}px`;
  // console.log(gMeme.lines[gMeme.selectedLineIdx].size);
}

function decreaseFontSize() {
  console.log("decrease font");
  var fontSizeStr = gMeme.lines[gMeme.selectedLineIdx].size;
  var fontSizeNum = +fontSizeStr.slice(0, 2);
  var decNum = --fontSizeNum;
  gMeme.lines[gMeme.selectedLineIdx].size = `${decNum.toString()}px`;
  console.log(gMeme.lines[gMeme.selectedLineIdx].size);
}

function addLineToMeme(isEmptyLines) {
  if (gMeme.lines.length === 1 && gMeme.lines[0].txt === '') return;
  var elCanvas = getElCanvas();
  var yPos = (gMeme.lines.length === 1) ? elCanvas.height - 20 : elCanvas.height / 2;
  gMeme.lines.push({
    lineId: gLineId++,
    txt: '',
    size: '30px',
    align: 'center',
    color: 'white',
    x: elCanvas.width / 2,
    y: yPos
  })
  if (!isEmptyLines) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function switchLine() {
  if ((gMeme.selectedLineIdx === 0)) gMeme.selectedLineIdx = gMeme.lines.length - 1;
    else gMeme.selectedLineIdx--;
    return gMeme.selectedLineIdx
}

function setLineTxt(text) {
  var selectedLineIdx = gMeme.selectedLineIdx
  gMeme.lines[selectedLineIdx].txt = text;
}

function setImg(elImg) {
  var memeImg = elImg
  console.log(memeImg);
  gMeme.selectedImgId = +memeImg.dataset.memeimgidx
  console.log(typeof gMeme.selectedImgId);
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
