let linkOP='https://github.com/soybisonte';
console.log('BEAT: ');
console.log('%c'+linkOP,'background:#ff0050; color:#FFF;');

let inputVideo;
let canvasVideo;

let ctracker = new clm.tracker();
let sqrRadius = 20;

let videoSignal;
let videoPixelsColors = [];


function setup() {
  createCanvas(2 * windowWidth/3, 2*windowHeight/3);
  canvasVideo = createCapture(VIDEO);
  let density = pixelDensity();
  inputVideo = canvasVideo.elt;
  canvasVideo.size(640, 480);
  ctracker.init();
  ctracker.start(inputVideo);
  background(0);

  videoSignal = new Signal(ctracker,sqrRadius);
}

function draw() {
  image(canvasVideo, 0, 0, 640, 480);
  noStroke();
  onMousePressed();
}


function onMousePressed(){
  if(mouseIsPressed){
      rectMode(CENTER);
      let squarePosition = videoSignal.centerPosition();
      fill(0,255,0);
      rect(squarePosition.x, squarePosition.y ,sqrRadius, sqrRadius);
      // carita(squarePosition.x,squarePosition.y);
      // videoPixelsColors = getLuminanceOfPixels();
      if(frameCount % 30 == 0){
      videoPixelsColors = getGreenColorOfPixels();
    }

      let c = MathHelpers.calcAverage(videoPixelsColors);
      // console.log(c);
      fill(0,c,0);
      rect(570, 410, 70, 70);
      drawCurve(c);
  }
}

function getLuminanceOfPixels(){
  loadPixels();
  let pixelLuminance = [];
  let squareArea = videoSignal.pixelsOfSquare();
  for (var i = 0; i < squareArea.length; i++) {
    let currentPixelColor = get(squareArea[i].x ,squareArea[i].y);
    let currentLuminance = currentPixelColor[0] * 0.229 +  currentPixelColor[1] * 0.587 + currentPixelColor[2] * 0.114;
    pixelLuminance.push(currentLuminance);
  }
  updatePixels();
  return pixelLuminance;
}


function getGreenColorOfPixels(){
  loadPixels();
  let pixelGreenColor=[];
  let squareArea = videoSignal.pixelsOfSquare();
  for (var i = 0; i < squareArea.length; i++) {
    let currentPixelColor = get(squareArea[i].x ,squareArea[i].y);
    pixelGreenColor.push(currentPixelColor[1]);
  }
  updatePixels();
  return pixelGreenColor;
}
let counter=0;
function drawCurve(brillo){
  push();
  translate(frameCount,410);
  let brilloMapeado = map(135,155,-50,50);
  // strokeWeight(1);
  // stroke(255);
  // point(0,brillo + 20);
  if(frameCount % 3 == 0){
    counter+=1;
    // console.log('=======>', counter);
    strokeWeight(2);
    stroke(255,0,0);
    point(0, brillo);
  }
  pop();
}

// function carita(x,y){
//   fill(255);
//   ellipse(x - 35, y + 35 ,sqrRadius+ 20, sqrRadius+ 20);
//   ellipse(x + 35, y + 35 ,sqrRadius+ 20, sqrRadius+ 20);
//   fill(0);
//   ellipse(x - 35, y + 35 ,sqrRadius - 20, sqrRadius );
//   ellipse(x + 35, y + 35 ,sqrRadius - 20, sqrRadius);
// }

/*get full rgb color
function getColorsOfPixels(){
  loadPixels();
  let pixelColors=[];
  let squareArea = videoSignal.pixelsOfSquare();
  for (var i = 0; i < squareArea.length; i++) {
    let currentPixelColor = get(squareArea[i].x ,squareArea[i].y);
    pixelColors.push(currentPixelColor);
  }
  updatePixels();
  return pixelColors;
}*/
