"use strict";

var gElCanvas;
var gCtx;

function onInit() {
  gElCanvas = document.getElementById("memeCanvas");
  gCtx = gElCanvas.getContext("2d");
  
  renderGallery();
  // resizeCanvas()
  renderMeme();
  
}

function renderMeme() {
  drawMeme();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 10;
    gElCanvas.height = elContainer.offsetWidth - 10;
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
  const elImg = new Image();
  elImg.src = `img/meme-imgs (square)/${++memeId}.jpg`;
  gCtx.drawImage(elImg, 0, 0);
  meme.lines.forEach((line) => {
      drawText(
        line.txt,
        line.x,
        line.y,
        line.size,
        line.color,
        line.align
      );
    });
}

// function clearCanvas() {
//   gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
// }

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

function onAddLine() {
  document.querySelector("#memeText").value = "";
  document.querySelector("#memeText").focus();
  addLineToMeme(false); // false = if lines empty
}

function onDeleteLine() {
  document.querySelector('.memeText').value = '';
  var meme = getMeme();
  if (meme.lines.length === 1 && meme.lines[0].text === '') return;

  var currlineIdx = meme.selectedLineIdx;
  meme.lines.splice(currlineIdx, 1);
  if (meme.lines.length) {
    renderMeme()
      changeLinesId(meme);
      if (currlineIdx) {
          meme.selectedLineIdx = currlineIdx - 1;
      } else {
          meme.selectedLineIdx = 0;
      }
  } else {
      addLineToMeme(true); //true = if is line empty
      renderMeme()
  }
}

function onChangeFontSize(value) {
  changeFontSize(value)
  renderMeme();
}

function clickChangeColor() {
  var elColor = document.getElementById('colorpicker');
  elColor.click();
}
