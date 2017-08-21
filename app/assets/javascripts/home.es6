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

const fft =  new FFTJS(maxDataSamples);
let transformedData =[];
let absBuffer=[];
let freqs=[];

let beatCount = 0;
let hannWindowData=[];

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
  let mappedBright =  map(brightness, 100,150,0,1);
  // console.log(brightness,mappedBright);

  MathHelpers.BinaryDataBuilder(dataSamples,maxDataSamples,relativeTime ,'time', mappedBright,'brightness');
  MathHelpers.dynamicArray(brightData,mappedBright,maxDataSamples);
  MathHelpers.smoothArray(brightData,0.3);
  // console.log(brightData[brightData.length-1]);

  /* transformeBrigthToFourierDomain
  documentation on https://github.com/indutny/fft.js
  */

  if (brightData.length >= maxDataSamples && frameCounter % 15 ==0) {

    fft.realTransform(transformedData, brightData);
    absBuffer =  MathHelpers.magsOfBuffer(transformedData);
    let mean =  MathHelpers.calcAverage(transformedData);
    let blue = {r:0,g:125,b:255};


    let peaks = MathHelpers.peakDetection(absBuffer);
    graphLine(peaks,relativeTime, {r:255,g:125,b:0});
    // absBuffer = MathHelpers.vectorMultiply(absBuffer,hannWindowData);
    freqs = MathHelpers.idemArray(maxDataSamples);
    freqs = MathHelpers.vectorScalarMultiply(freqs,60 * frameRate()/maxDataSamples);
    // console.log(freqs);
    // console.log(absBuffer);
    // graphicas();
  }
  // fill(brightness,0,0);
  // rect(570, 410, 70, 70);
  // fill(0,brightData[0]*100,0);
  // rect(70, 410, 70, 70);
  /* transformeBrigthToFourierDomain */
}


function graph(brillo,tiempo,color){
  push();
  translate(100,410);
  if(frameCount % 1 == 0){
    // frameCounter+=1;
    strokeWeight(1);
    stroke(color.r,color.g,color.b);
    point(tiempo*10, brillo);
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


function graphicas(){

  let red = {r:255,g:0,b:0};
  let green = {r:125,g:125,b:0};

  if (dataSamples.length > 0) {
    graph(dataSamples[dataSamples.length-1].brightness*150,relativeTime, red);
    graphLine(absBuffer[absBuffer.length-1]*150,relativeTime, green);
  }
}
