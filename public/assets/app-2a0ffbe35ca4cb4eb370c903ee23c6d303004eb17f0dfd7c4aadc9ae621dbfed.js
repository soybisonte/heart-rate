let linkOP='https://github.com/soybisonte';
console.log('BEAT: ');
console.log('%c'+linkOP,'background:#ff0050; color:#FFF;');


const lowBpm = 40;
const highBpm = 230;

let inputVideo;
let canvasVideo;

let ctracker = new clm.tracker();
let sqrRadius = 20;

let videoSignal;
let videoPixelsColors = [];

let timeStamp = 0;
let relativeTime = 0;
let frameCounter = 0;

const maxDataSamples =  128; // this number needs to be a power of two
let dataSamples=[]; // array that contains dataSamples of brightness and time
let brightData=[];


// for UI
let toggle = false;



function setup() {
  createCanvas(2 * windowWidth/3, 2*windowHeight/3);
  canvasVideo = createCapture(VIDEO);
  let density = pixelDensity();
  inputVideo = canvasVideo.elt;
  canvasVideo.size(640, 480);
  ctracker.init();
  ctracker.start(inputVideo);
  background(0);
  // drums = EDrums('x*o*x*o-');
  // follow = Follow( drums );

  videoSignal = new Signal(ctracker,sqrRadius);
  hannWindowData = MathHelpers.hannWindow(maxDataSamples);
  //complette complex array with bright

}

function draw() {
  // background( follow.getValue() * 255 );
  image(canvasVideo, 0, 0, 640, 480);
  rectMode(CENTER);
  // filter(POSTERIZE,3);

  noStroke();
  if(toggle){
    core();
  }
}


function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    toggle = true;
    timeStamp = millis()/1000;
  }
  else if (keyCode === DOWN_ARROW) {
    toggle = false;
  }
  else if (keyCode === LEFT_ARROW) {
    clear();
    background(0);
    toggle = false;
    // saveJSON(dataSamples,'data');
  }
}



function core(){
  relativeTime = millis()/1000 - timeStamp;
  /* text */
  textSize(32);
  fill(0);
  rect(width - 150, 50, 150,150);
  fill(255);
  text(floor(relativeTime),width - 200, 50);

  /* text */
  let squarePosition = videoSignal.centerPosition();
  fill(0,255,0);
  rect(squarePosition.x, squarePosition.y ,sqrRadius, sqrRadius);

  let dataPixels = videoSignal.pixelsOfSquare();

  loadPixels();
  // videoPixelsColors = PixelUtils.getLuminanceOfPixels(dataPixels);
  videoPixelsColors = PixelUtils.getGreenColorOfPixels(dataPixels);
  // videoPixelsColors = PixelUtils.getRedColorOfPixels(dataPixels);
  // videoPixelsColors = PixelUtils.getBlueColorOfPixels(dataPixels);
  updatePixels();

  let brightness = MathHelpers.calcAverage(videoPixelsColors);
  let mappedBright =  map(brightness, 0,150,0,100);
  // console.log(brightness,mappedBright);

  MathHelpers.BinaryDataBuilder(dataSamples,maxDataSamples,relativeTime ,'time', brightness,'brightness');
  MathHelpers.dynamicArray(brightData,brightness,maxDataSamples);
  MathHelpers.smoothArray(brightData,0.6);
  // console.log(brightData[brightData.length-1]);

  /* transformeBrigthToFourierDomain
  documentation on https://github.com/indutny/fft.js
  */

  if (brightData.length >= maxDataSamples) {
    var mean = MathHelpers.calcAverage(brightData);
    var sdv = MathHelpers.standarDevation(brightData);
    let threshold = 3.5;
    let lastPoint = brightData[brightData.length-1];
    let signal = 0;
    let counter = 0;

    if (Math.abs(lastPoint - mean) > threshold * sdv) {
      if (lastPoint > mean) {
        signal = 1;
        counter+= 1;
      }
      else{
        signal = -1;
        counter+= 1;
      }
    }
    else{
      signal = 0;
    }
    console.log(mean,brightData[brightData.length-1]);
    graph(dataSamples[dataSamples.length-1].brightness, relativeTime, {r:0,g:255,b:0});
    graph(brightData[brightData.length-1], relativeTime, {r:255,g:0,b:0});
    graph(mean, relativeTime, {r:0,g:125,b:255});
    graph(signal * 50, relativeTime, {r:0,g:125,b:255});

    // console.log(brightData[brightData.length-1],signal);
  }

}


function graph(brillo,tiempo,color){
  push();
  translate(100,410);
  if(frameCount % 1 == 0){
    // frameCounter+=1;
    strokeWeight(1);
    stroke(color.r,color.g,color.b);
    point(tiempo*10,brillo);
    //line(tiempo * 10 ,480 - brillo * 2 ,tiempo*10 ,brillo);
  }
  pop();
}

function graphLine(data,tiempo,color){
  push();
  translate(100,580);
  if(frameCount % 1 == 0){
    // frameCounter+=1;
    strokeWeight(1);
    stroke(color.r,color.g,color.b);
    // point(tiempo*10, data);
    line(tiempo * 10 , -data ,tiempo*10 ,data);
  }
  pop();
}
;
