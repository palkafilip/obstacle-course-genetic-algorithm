import { CommonUtils } from "../utils/common-utils.js";
import { Individual } from "../ga-structures/individual.js";

export class Crossover {

    constructor(crossingPointsNumber) {
        this.crossingPointsNumber = crossingPointsNumber;
    }

    reproduce(parentA, parentB) {
        const chromosomeLength = parentA.chromosome.directions.length;
        const randoms = CommonUtils.getArrayWithUniqueRandomIntegers(this.crossingPointsNumber, chromosomeLength);

        randoms.unshift(0);
        randoms.push(chromosomeLength);
        randoms.sort((a, b) => a - b);

        const parents = [parentA, parentB];
        let child = [];

        for (let i = 0; i < this.crossingPointsNumber + 1; i++) {
            child = child.concat(parents[i % 2].chromosome.directions.slice(randoms[i], randoms[i + 1]))
        }

        const individual = new Individual();
        individual.chromosome.directions = child;

        return individual;
    }
}