import { CommonUtils } from "../utils/common-utils.js";
import { Selection } from "./selection.js";

export class TournamentSelection extends Selection {

    constructor(subsetSize) {
        super(subsetSize);
    }

    select(individuals) {
        const selectedIndexes = CommonUtils.getArrayWithUniqueRandomIntegers(this.subsetSize, individuals.length);
        const selectedIndividuals = [];
        selectedIndexes.forEach(index => selectedIndividuals.push(individuals[index]));

        selectedIndividuals.sort((a, b) => b.fitnessScore - a.fitnessScore);

        return selectedIndividuals[0].clone();
    }
}