import { Individual } from "./individual.js";
import { IndividualState } from "./individual-state.js";

export class Population {

    constructor(size, selection, crossover, mutation) {
        this.selection = selection;
        this.crossover = crossover;
        this.mutation = mutation;

        this.individuals = this.createSquares(size);
    }

    createSquares(size) {
        const individuals = []
        for (let i = 0; i < size; i++) {
            individuals.push(new Individual());
        }

        return individuals;
    }

    update(obstacles, finishArea) {
        this.individuals.forEach(individual => {
            individual.update(obstacles, finishArea)
        })

        if (this.checkIfAllDead()) {
            this.createAllSquaresDeadEvent();
        }
    }

    checkIfAllDead() {
        return this.individuals.every(individual => individual.state != IndividualState.ALIVE)
    }

    createAllSquaresDeadEvent() {
        const event = new Event('allDead');
        dispatchEvent(event);
    }

    updatePopulation() {
        this.individuals = this.createNewPopulation();
    }

    createNewPopulation() {
        const newIndividuals = [];
        const bestIndividual = this.getBestIndividual();

        console.log('fit score: ' + bestIndividual.fitnessScore + ' status: ' + bestIndividual.state);
        console.log('position:' + bestIndividual.position.x + ' ' + bestIndividual.position.y);

        bestIndividual.image.src = '/assets/green_shroom.png';
        newIndividuals.push(bestIndividual.clone());

        newIndividuals[0].image.src = '/assets/green_shroom.png';

        let individual, parentA, parentB;
        for (let i = 0; i < this.individuals.length - 1; i++) {
            parentA = this.selection.select(this.individuals);
            parentB = this.selection.select(this.individuals);
            individual = this.crossover.reproduce(parentA, parentB);
            individual = this.mutation.mutate(individual);

            newIndividuals.push(individual);
        }

        return newIndividuals;
    }

    getBestIndividual() {
        let individualsCopy = [...this.individuals];
        individualsCopy.sort((a, b) => b.fitnessScore - a.fitnessScore);

        return individualsCopy[0];
    }
}