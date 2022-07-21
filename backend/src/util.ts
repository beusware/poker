export class Util {
  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  static objectOfArrayWithProperty(array: Array<any>, key: any, value: any): any {
    for (let object of array) {
      if (object[key] == value) return object;
    }

    return null;
  }
}