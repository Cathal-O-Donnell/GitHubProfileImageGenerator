const CANVAS = document.getElementById('canvas');
const CONTEXT = CANVAS.getContext('2d');
const CANVAS_PADDING = 20;
const ROW_HEIGHT = (CANVAS.height - CANVAS_PADDING) / 5;
const COLUMN_WIDTH = (CANVAS.width - CANVAS_PADDING) / 5;
const COLOR_ARR = ['#5FCD6D', '#D3BDF0', '#77C5D4', '#DB73C0', '#CC6760', '#E3D38F', '#78EBDF', '#DB90AF', '#91DB94', '#EE964B', '#F694C1', '#23A899', '#FCA17D', '#DA627D'];

let imageColor;
let imagePattenArr = [];

// DOM Ready
(function() {
  setUpEventListeners();
  generate();
})();

function setUpEventListeners() {
  document.getElementById('btnNew').addEventListener('click', generateNew);
}

function generateNew() {
  clearCanvas();
  generate();
}

function clearCanvas() {
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

function generate() {
  imageColor = getRandomColor();
  imagePattenArr = generatePattern();

  drawPattern(imagePattenArr);
}

function drawPattern(patternArr) {

  for (let i = 0; i < patternArr.length; i++) {

    // Left
    for (let x = 0; x < 2; x++) {

      if (patternArr[i][x]) {
        fillSquare((ROW_HEIGHT * x) + (CANVAS_PADDING / 2), (COLUMN_WIDTH * i) + (CANVAS_PADDING / 2));
      }
    }

    // Middle
    if (patternArr[i][2]) {
      fillSquare((ROW_HEIGHT * (4 - 2)) + (CANVAS_PADDING / 2), (COLUMN_WIDTH * i) + (CANVAS_PADDING / 2));
    }

    // Right - this is a reverse of the patten on the left
    for (let x = 0; x < 2; x++) {

      if (patternArr[i][x]) {
        fillSquare((ROW_HEIGHT * (4 - x)) + (CANVAS_PADDING / 2), (COLUMN_WIDTH * i) + (CANVAS_PADDING / 2));
      }
    }
  }
}

function fillSquare(x, y) {
  CONTEXT.fillStyle = imageColor;
  CONTEXT.fillRect(x, y, ROW_HEIGHT, COLUMN_WIDTH);
}

function generatePattern() {
  let resultArr = [],
    rowPatternArr = [];

  for (let i = 0; i < 5; i++) {
    rowPatternArr = [];

    for (let x = 0; x < 3; x++) {
      rowPatternArr.push(Math.floor(Math.random() * 10) > 3);
    }

    resultArr.push(rowPatternArr);
  }

  return resultArr;
}

function getRandomColor() {
  return COLOR_ARR[Math.floor(Math.random() * COLOR_ARR.length)];
}