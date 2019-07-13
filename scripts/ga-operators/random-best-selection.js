import { CommonUtils } from "../utils/common-utils.js";
import { Selection } from "./selection.js";

export class RandomBestSelection extends Selection {

    constructor(subsetSize) {
        super(subsetSize);
    }

    select(individuals) {
        let individualsCopy = [...individuals];
        
        individualsCopy.sort((a, b) => b.fitnessScore - a.fitnessScore);

        const selectedIndividuals = individualsCopy.slice(0, this.subsetSize);
        const randomIndex = CommonUtils.getRandomInteger(selectedIndividuals.length);

        return selectedIndividuals[randomIndex].clone();
    }
}