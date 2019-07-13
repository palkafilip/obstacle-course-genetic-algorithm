import { CommonUtils } from "../utils/common-utils.js";
import { Individual } from "../ga-structures/individual.js";

export class Mutation {

    constructor(mutationRate) {
        this.mutationRate = mutationRate;
    }

    mutate(individual) {
        const directions = [...individual.chromosome.directions];
        let randomNumber;

        for (let i = 0; i < directions.length; i++) {
            randomNumber = CommonUtils.getRandomNumber(1);

            if (randomNumber < this.mutationRate) {
                directions[i] = CommonUtils.getRandomPoint(8, 4);
            }
        }

        const newIndividual = new Individual();
        newIndividual.chromosome.directions = directions;

        return newIndividual;
    }
}