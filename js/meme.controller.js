"use strict";

var gElCanvas;
var gCtx;
var gStartPos;

function onInit() {
  renderGallery();
  gElCanvas = document.getElementById("memeCanvas");
  gCtx = gElCanvas.getContext("2d");

  
  // resizeCanvas()
  
  renderMeme();
  addListeners();
}

function renderMeme() {
  drawMeme();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetWidth;
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
}

function addMouseListeners() {
  gElCanvas.addEventListener("mousemove", onMove);
  gElCanvas.addEventListener("mousedown", onDown);
  gElCanvas.addEventListener("mouseup", onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener("touchmove", onMove);
  gElCanvas.addEventListener("touchstart", onDown);
  gElCanvas.addEventListener("touchend", onUp);
}

function getElCanvas() {
  return gElCanvas;
}

function getgCtx() {
  return gCtx
}

function onDown(ev) {
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev);
  if (!isLineClicked(pos)) return;

  setLineDrag(true);
  //Save the pos we start from
  gStartPos = pos;
  document.body.style.cursor = "grabbing";
}

function onMove(ev) {
  const { isDrag } = getMeme()

  if (!isDrag) return
  
  const pos = getEvPos(ev)
  // Calc the delta , the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy)
  // Save the last pos , we remember where we`ve been and move accordingly
  gStartPos = pos
  // The canvas is render again after every move
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  // Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  // Check if its a touch ev
  // if (TOUCH_EVS.includes(ev.type)) {
  //     console.log('ev:', ev)
  //     //soo we will not trigger the mouse ev
  //     ev.preventDefault()
  //     //Gets the first touch point
  //     ev = ev.changedTouches[0]
  //     //Calc the right pos according to the touch screen
  //     pos = {
  //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
  //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
  //     }
  // }
  return pos;
}

function isLineClicked(clickedPos) {
  const { lines } = gMeme;
  var textBounds = gCtx.measureText(lines[gMeme.selectedLineIdx].txt);
  return gMeme.lines.find(line =>
    clickedPos.x >= gElCanvas.width / 2 - textBounds.width / 2 &&
    clickedPos.x <= gElCanvas.width / 2 + textBounds.width / 2 &&
    clickedPos.y >= gElCanvas.height / 2 - 16 &&
    clickedPos.y <= gElCanvas.height / 2
  );
}

function drawText(text, x, y, fontSize, fontColor, txtAlign) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = `${fontColor}`;
  gCtx.font = `${fontSize}px Impact`;
  gCtx.textAlign = `${txtAlign}`;
  gCtx.textBaseline = "middle";

  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function drawMeme() {
  var meme = getMeme();
  var memeId = meme.selectedImgId;
  const elImg = new Image();
  elImg.src = `img/meme-imgs (square)/${++memeId}.jpg`;
  gCtx.drawImage(elImg, 0, 0);
  meme.lines.forEach((line) => {
    drawText(line.txt, line.x, line.y, line.size, line.color, line.align);
  });
}

function onSwitchLine() {
  var meme = getMeme();
  var selectedLineIdx = switchLine();
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
  addLineToMeme(false);
}

function onDeleteLine() {
  document.querySelector(".memeText").value = "";

  var meme = getMeme();
  if (meme.lines.length === 1 && meme.lines[0].text === "") return;

  var currlineIdx = meme.selectedLineIdx;
  meme.lines.splice(currlineIdx, 1);
  if (meme.lines.length) {
    renderMeme();
    changeLinesId(meme);
    if (currlineIdx) {
      
      meme.selectedLineIdx = currlineIdx - 1;
    } else {
      
      meme.selectedLineIdx = 0;
    }
  } else {
    addLineToMeme(true);
    renderMeme();
  }
}

function onChangeFontSize(value) {
  changeFontSize(value);
  renderMeme();
}

function clickChangeColor() {
  var elColor = document.getElementById("colorpicker");
  elColor.click();
}

function downloadMeme(elLink) {
  renderMeme()
  var elCanvas = getElCanvas();
  const data = elCanvas.toDataURL();
  elLink.href = data;
  elLink.download = "your Meme";
}
