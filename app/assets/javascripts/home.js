let linkOP='https://github.com/soybisonte';
console.log('BEAT: ');
console.log('%c'+linkOP,'background:#ff0050; color:#FFF;');

let inputVideo;
let canvasVideo;

let ctracker = new clm.tracker();
let sqrRadius = 20;

let videoSignal;
let videoPixelsColors = [];

let timeStamp = 0;
let relativeTime = 0;
let frameCounter = 0;

let maxDataSamples =  256; // this number needs to be a power of two
let dataSamples=[]; // array that contains dataSamples of brightness and time
let brightData=[];

const fft =  new FFTJS(maxDataSamples);
let transformedData =[];
let absBuffer=[];
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
  videoSignal = new Signal(ctracker,sqrRadius);

  //complette complex array with bright


}

function draw() {
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
  let squarePosition = videoSignal.centerPosition();
  fill(0,255,0);
  rect(squarePosition.x, squarePosition.y ,sqrRadius, sqrRadius);

  let dataPixels = videoSignal.pixelsOfSquare();

  loadPixels();
  // videoPixelsColors = PixelUtils.getLuminanceOfPixels(dataPixels);
  videoPixelsColors = PixelUtils.getGreenColorOfPixels(dataPixels);
  updatePixels();

  let brightness = MathHelpers.calcAverage(videoPixelsColors);
  let mappedBright =  map(brightness, 100,210,0,1);
  MathHelpers.BinaryDataBuilder(dataSamples,maxDataSamples,relativeTime ,'time', brightness,'brightness');
  MathHelpers.dynamicArray(brightData,mappedBright,maxDataSamples);

  /* transformeBrigthToFourierDomain
  documentation on https://github.com/indutny/fft.js
  */

  if (brightData.length >= maxDataSamples) {
    fft.realTransform(transformedData, brightData);
    // console.log(transformedData);
    absBuffer =  MathHelpers.magsOfBuffer(transformedData);
    console.log(absBuffer);
  }
  /* transformeBrigthToFourierDomain */
  fill(0,brightness,0);
  rect(570, 410, 70, 70);

  if (dataSamples.length > 0) {
    graph(dataSamples[dataSamples.length-1].brightness,dataSamples[dataSamples.length-1].time);
  }

}




function graph(brillo,tiempo){
  push();
  translate(100,410);
  if(frameCount % 15 == 0){
    // frameCounter+=1;
    strokeWeight(1);
    stroke(255,0,0);
    // point(tiempo*10, brillo);
    line(tiempo * 10 ,480 - brillo * 2 ,tiempo*10 ,brillo);
  }
  pop();
}
