/* Math helpèrs for calculations */

class MathHelpers {

    constructor() {}

    static calcAverage(data) {
        let sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i];
        }
        return sum / data.length;
    }

    static BinaryDataBuilder(arrayForSave, maxDataSamples, x, x_dataKey, y, y_dataKey) {
        if (arrayForSave.length < maxDataSamples) {
            arrayForSave.push({
                [x_dataKey]: x,
                [y_dataKey]: y
            });
        } else {
            arrayForSave.shift();
            arrayForSave.push({
                [x_dataKey]: x,
                [y_dataKey]: y
            });
        }
    }

    static dynamicArray(arrayForSave,newValue, size){
      if (arrayForSave.length < size) {
        arrayForSave.push(newValue);
      }
      else{
        arrayForSave.shift();
        arrayForSave.push(newValue);
      }
    }

    static zerosArray(size) {
        let zeros = [];
        for (var i = 0; i < size; i++) {
            zeros[i]=0;
        }
        return zeros;
    }

    static normOfVector(x,y){
      return Math.sqrt(x * x + y * y);
    }

    static magsOfBuffer(complexArray){
      let mags=[];
      for (var i = 0; i < complexArray.length; i+=2) {
        mags.push(this.normOfVector(complexArray[i],complexArray[i+1]));
      }
      return mags;
    }

    static maxInArray(array){
      let supremum = 0;
      for (var i = 0; i < array.length; i++) {
        supremum = Math.max(supremum, array[i]);
      }
      return supremum;
    }

}
