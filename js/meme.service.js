"use strict";

var gImgs;
var gImgIdx = 0;
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      lineId: 0,
      txt: "add text here",
      size: "30px",
      align: "left",
      color: "#fff",
      x:50,
      y:50,
    },
    {
      lineId: 1,
      txt: "second line",
      size: "30px",
      align: "left",
      color: "#fff",
      x:50,
      y:350,
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

function changeTextColor(color) {
  gMeme.lines[0].color = color;
}

function increaseFontSize() {
  console.log("increase font");
  var fontSizeStr = gMeme.lines[0].size;
  var fontSizeNum = +fontSizeStr.slice(0, 2);
  var incNum = ++fontSizeNum;
  gMeme.lines[0].size = `${incNum.toString()}px`;
  console.log(gMeme.lines[0].size);
}

function decreaseFontSize() {
  console.log("decrease font");
  var fontSizeStr = gMeme.lines[0].size;
  var fontSizeNum = +fontSizeStr.slice(0, 2);
  var incNum = --fontSizeNum;
  gMeme.lines[0].size = `${incNum.toString()}px`;
  console.log(gMeme.lines[0].size);
}

// function addLineToMeme(isEmptyLines) {
//   if(isEmptyLines) 
// }

function switchLine() {
  if ((gMeme.selectedLineIdx === 0)) gMeme.selectedLineIdx = gMeme.lines.length - 1;
    else gMeme.selectedLineIdx--;
    return gMeme.selectedLineIdx
}

function setLineTxt(text) {
  var selectedLineIdx = gMeme.selectedLineIdx
  gMeme.lines[selectedLineIdx].txt = text;
  return gMeme.lines[selectedLineIdx].txt;
}

function setImg(id) {
  var selectedImg = gImgs[id];
  gMeme.selectedImgId = selectedImg.id;
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
