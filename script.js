/*
  TODO::
    - image padding
    - export image
    - make sure image is neither full or empty
*/

const CANVAS = document.getElementById('canvas');
const CONTEXT = CANVAS.getContext('2d');
const ROW_HEIGHT = (CANVAS.height) / 5;
const COLUMN_WIDTH = (CANVAS.width) / 5;
const COLOR_ARR = ['#5FCD6D', '#D3BDF0', '#77C5D4', '#DB73C0', '#CC6760', '#E3D38F'];

let imageColor;
let imagePattenArr = [];

(function() {
  generate();
})();

function generate() {
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
  imageColor = getRandomColor();
  imagePattenArr = generatePattern();
  drawPattern(imagePattenArr);
}

function drawPattern(patternArr) {

  for (let i = 0; i < patternArr.length; i++) {

    // Left
    for (let x = 0; x < 2; x++) {

      if (patternArr[i][x]) {
        fillSquare((ROW_HEIGHT * x), (COLUMN_WIDTH * i));
      }
    }

    // Middle
    if (patternArr[i][2]) {
      fillSquare((ROW_HEIGHT * (4 - 2)), (COLUMN_WIDTH * i));
    }

    // Right - this is a reverse of the patten on the left
    for (let x = 0; x < 2; x++) {

      if (patternArr[i][x]) {
        fillSquare((ROW_HEIGHT * (4 - x)), (COLUMN_WIDTH * i));
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