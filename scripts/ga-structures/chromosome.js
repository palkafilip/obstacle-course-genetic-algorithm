import { CommonUtils } from "../utils/common-utils.js";

export class Chromosome {

    constructor(size) {
        this.directions = this.randomDirections(size);
        this.step = 0;
    }

    randomDirections(size) {
        const directions = [];
        for(let i=0; i<size; i++) {
            directions.push(CommonUtils.getRandomPoint(8, 4));
        }

        return directions;
    }
}