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
    static variation(data){
      let sdv=0;
      let mean = this.calcAverage(data);
      for (var i = 0; i < data.length; i++) {
        sdv+= Math.pow((data[i] - mean),2);
      }
      sdv = sdv / data.length
      return sdv;
    }
    static standarDevation(data){
      return Math.sqrt(this.variation(data));
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

    static dynamicArray(arrayForSave, newValue, size) {
        if (arrayForSave.length < size) {
            arrayForSave.push(newValue);
        } else {
            arrayForSave.shift();
            arrayForSave.push(newValue);
        }
    }

    static zerosArray(size) {
        let zeros = [];
        for (var i = 0; i < size; i++) {
            zeros[i] = 0;
        }
        return zeros;
    }
    static idemArray(size) {
        let idem = [];
        for (var i = 0; i < size; i++) {
            idem[i] = 1;
        }
        return idem;
    }

    static normOfVector(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    static magsOfBuffer(complexArray) {
        let mags = [];
        for (var i = 0; i < complexArray.length; i += 2) {
            mags.push(this.normOfVector(complexArray[i], complexArray[i + 1]));
        }
        return mags;
    }

    static maxInArray(array) {
        let supremum = 0;
        for (var i = 1; i < array.length; i++) {
            supremum = Math.max(supremum, array[i]);
        }
        return supremum;
    }

    static indexOfMax(array) {
        if (array.length === 0) {
            return -1;
        }
        let max = array[1];
        let maxIndex = 0;

        for (var i = 1; i < array.length; i++) {
            if (array[i] > max) {
                maxIndex = i;
                max = array[i];
            }
        }
        return [maxIndex,max];
    }
    static peakDetection(data){
      let peaks=0;
      for (var i = 2; i < data.length - 2; i++) {
        if (data[i] > data[i-1] && data[i] < data[i+1]) {
          if (data[i] > data[i-2] && data[i] < data[i+2]) {
            peaks += 1;
          }
        }
      }
      return peaks;
    }

    static smoothArray(values, smoothing) {
        let value = values[0]; // start with the first input
        for (var i = 1, len = values.length; i < len; ++i) {
            let currentValue = values[i];
            value += (currentValue - value) * smoothing;
            values[i] = value;
        }
    }

    static hannWindow (size){
      let result=[];
      for (var i = 0; i < size; i++) {
        result[i] = 0.5 * (1 - cos((2 * Math.PI * i) / (size - 1)));
      }
      return result;
    }
    static vectorMultiply(a,b){
      let result = [];
      for (var i = 0; i < a.length; i++) {
        result.push(a[i] * b[i]);
      }
      return result;
    }
    static vectorScalarMultiply(vector,scalar){
      let result = [];
      for (var i = 0; i < vector.length; i++) {
         result.push(vector[i] * scalar);
      }
      return result;
    }

}
