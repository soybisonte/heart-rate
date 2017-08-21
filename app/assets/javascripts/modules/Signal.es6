//Get data Signal
//this requires a clm object called track on this class
// and if needed import the module clm
class Signal {

  constructor(track, radius) {
    this.track = track;
    this.radius = radius;
    this.step = 3;
  }

  // calcs the center of the forehead
  centerPosition(){
    let positions = this.track.getCurrentPosition();
    let leftPoint = positions[18];
    let rightPoint = positions[22];
    let cx =0;
    let cy =0;
    if (typeof(leftPoint)!=="undefined" && typeof(rightPoint)!=="undefined") {
      cx = ((leftPoint[0] + rightPoint[0])/2);
      cy = ((leftPoint[1] + rightPoint[1]) / 2) - this.radius;
    }
    return {x: cx, y: cy};
  }
  // return an array of pixels to be computed for the brightness signal
  pixelsOfSquare(){
    let sqrPixels = [];
    let center = this.centerPosition();
    let boundArea = this.radius;
    for (let i = -boundArea; i <= boundArea; i+= this.step) {
      for (let j = -boundArea; j <= boundArea; j+= this.step) {
        let xCoord = Math.floor(i + center.x);
        let yCoord = Math.floor(j + center.y);
        sqrPixels.push({x: xCoord, y: yCoord });
      }
    }
    return sqrPixels;
  }

}
