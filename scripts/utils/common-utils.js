import { Pair } from "./pair.js";

export class CommonUtils {

    static concatTwoArrays(first, second) {
        return first.concat(second);
    }

    static getRandomPoint(range, offset=0) {
        return new Pair(this.getRandomNumber(range, offset), this.getRandomNumber(range, offset));
    }

    static getRandomNumber(range, offset=0) {
        return Math.random() * range - offset;
    }

    static getRandomInteger(range, offset=0) {
        return Math.floor(Math.random() * range - offset);
    }

    static getArrayWithUniqueRandomIntegers(size, range, offset=0) {
        const set = new Set();
        while(set.size !== size) {
            set.add(CommonUtils.getRandomInteger(range, offset));
        }
        
        return [...set];
    }

    static getArrayWithRandomIntegers(size, range, offset=0) {
        return Array.from(Array(size), () => CommonUtils.getRandomInteger(range, offset));
    }
}