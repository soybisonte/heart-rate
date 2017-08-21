/* class helpers for basic operations with complex numbers
where a complex numberis represented into an array with the form:

let complex =  [real,imaginary];

*/

class ComplexHelpers {
  constructor() {
  }
  //addition
  static complexAdd(a,b){
   return [a[0] + b[0], a[1] + b[1]];
  }
  //substract
  static complexSubstract(a,b){
   return [a[0] - b[0], a[1] - b[1]];
  }

  //multiply
  static complexMultiply(a,b){
    return [(a[0] * b[0] - a[1] * b[1]),
             (a[0] * b[1] + a[1] * b[0])];
  }
  //Magnitud or Norm of the vector
  static complexMagnitud(complex){
    return Math.sqrt(complex[0]*complex[0] + complex[1]*complex[1]);
  }

}
