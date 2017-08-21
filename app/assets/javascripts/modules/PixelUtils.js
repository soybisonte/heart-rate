/// Utils for get luminances brightness exposures,
/// for use it inside de loading pixels function for example loadPixels from p5
/*
 usage (P5 example):

  loadPixels();
  PixelUtils.getLuminanceOfPixels(dataArray);
  updatePixels();

*/
class PixelUtils {

  constructor() {
  }

  static getGreenColorOfPixels(dataPixels){
    let pixelGreenColor=[];
    let squareArea = dataPixels;
    for (var i = 0; i < squareArea.length; i++) {
      let currentPixelColor = get(squareArea[i].x ,squareArea[i].y);
      pixelGreenColor.push(currentPixelColor[1]);
    }
    return pixelGreenColor;
  }
  static getRedColorOfPixels(dataPixels){
    let pixelRedColor=[];
    let squareArea = dataPixels;
    for (var i = 0; i < squareArea.length; i++) {
      let currentPixelColor = get(squareArea[i].x ,squareArea[i].y);
      pixelRedColor.push(currentPixelColor[0]);
    }
    return pixelRedColor;
  }
  static getBlueColorOfPixels(dataPixels){
    let pixelBlueColor=[];
    let squareArea = dataPixels;
    for (var i = 0; i < squareArea.length; i++) {
      let currentPixelColor = get(squareArea[i].x ,squareArea[i].y);
      pixelBlueColor.push(currentPixelColor[2]);
    }
    return pixelBlueColor;
  }

  static getLuminanceOfPixels(dataPixels){
    let pixelLuminance = [];
    let squareArea = dataPixels;
    for (var i = 0; i < squareArea.length; i++) {
      let currentPixelColor = get(squareArea[i].x ,squareArea[i].y);
      let currentLuminance = currentPixelColor[0] * 0.229 +  currentPixelColor[1] * 0.587 + currentPixelColor[2] * 0.114;
      pixelLuminance.push(currentLuminance);
    }
    return pixelLuminance;
  }

}
