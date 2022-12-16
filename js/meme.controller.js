"use strict";

var gElCanvas;
var gCtx;

function onInit() {
  renderGallery();
  renderMeme();
}

function renderMeme() {
  gElCanvas = document.getElementById("memeCanvas");
  gCtx = gElCanvas.getContext("2d");
  drawMeme();
}

function drawText(text, x, y, fontSize, fontColor, txtAlign) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = `${fontColor}`;
  gCtx.font = `${fontSize} Impact`;
  gCtx.textAlign = `${txtAlign}`;
  gCtx.textBaseline = "middle";

  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function getElCanvas() {
  return gElCanvas;
}

function drawMeme() {
  var meme = getMeme();
  var memeId = meme.selectedImgId;
//   var memeTxt = meme.lines[meme.selectedLineIdx].txt;
//   var memeFontSize = meme.lines[meme.selectedLineIdx].size;
//   var memeFontColor = meme.lines[meme.selectedLineIdx].color;
//   var memeTxtAlign = meme.lines[meme.selectedLineIdx].align;
//   var memePosX = meme.lines[meme.selectedLineIdx].x;
//   var memePosY = meme.lines[meme.selectedLineIdx].y;
  const elImg = new Image();
  elImg.src = `img/meme-imgs (square)/${memeId}.jpg`;
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    meme.lines.forEach((line, idx) => {
      drawText(
        line.txt,
        line.x,
        line.y,
        line.size,
        line.color,
        line.align
      );
    });
  };
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onSwitchLine() {
  var selectedLineIdx = switchLine();
  var meme = getMeme();
  drawText(
    meme.lines[selectedLineIdx].txt,
    meme.lines[selectedLineIdx].size,
    meme.lines[selectedLineIdx].color,
    meme.lines[selectedLineIdx].align,
    meme.lines[selectedLineIdx].x,
    meme.lines[selectedLineIdx].y
  );

  document.getElementById("memeText").value =
    meme.lines[meme.selectedLineIdx].txt;
}

function onSetLineText(value) {
  setLineTxt(value);
  renderMeme();
}

function onChangeTextColor(color) {
  changeTextColor(color);
  renderMeme();
}

// function onAddLine() {
//   document.querySelector("#memeText").value = "";
//   document.querySelector("#memeText").focus();
//   addLineToMeme(false); // false = if lines empty
// }

function onChangeFontSize(value) {
  var elChangeFontSizeBtn = value;
  var signOfBtn = elChangeFontSizeBtn.innerText;
  if (signOfBtn === "+") {
    increaseFontSize();
    renderMeme();
  } else {
    decreaseFontSize();
    renderMeme();
  }
}
