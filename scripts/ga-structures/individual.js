import { Chromosome } from "./chromosome.js";
import { Pair } from "../utils/pair.js";
import { CanvasHelper } from "../utils/canvas-helper.js";
import { IndividualState } from "./individual-state.js";
import { Rectangle } from "../objects/rectangle.js";

export class Individual extends Rectangle {

    constructor() {
        super(new Pair(100, 200), 25, 25, 'blue')
        this.chromosome = new Chromosome(400);
        this.velocity = new Pair(0, 0);
        this.VELOCITY_LIMIT = 10;
        this.fitnessScore = 0;
        this.state = IndividualState.ALIVE;
        this.image = new Image();
        this.image.src = '/assets/red_shroom.png';
    }

    move() {
        if (this.chromosome.step < 400) {
            this.velocity.x = this.checkLimitsAndUpdate(this.velocity.x, this.chromosome.directions[this.chromosome.step].x);
            this.velocity.y = this.checkLimitsAndUpdate(this.velocity.y, this.chromosome.directions[this.chromosome.step].y);

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            this.chromosome.step++;
        } else {
            this.state = IndividualState.DEAD;
        }
    }

    update(obstacles, finishArea) {
        if (this.state == IndividualState.ALIVE) {
            this.move();

            if (this.checkIfHitBoundaries() || this.checkIfHitObstacle(obstacles)) {
                this.state = IndividualState.DEAD;
                this.calculateFitnessFunction(finishArea);
            }

            if(this.checkIfReachedFinish(finishArea)) {
                this.state = IndividualState.WINNER;
                this.calculateFitnessFunction(finishArea);
            }
        }
    }

    checkLimitsAndUpdate(currentVelocity, velocityChange) {
        if (Math.abs(currentVelocity + velocityChange) < this.VELOCITY_LIMIT) {
            currentVelocity += velocityChange;
        }

        return currentVelocity;
    }

    checkIfHitBoundaries() {
        return this.position.x <= 0 || this.position.x + this.width >= CanvasHelper.getWidth()
            || this.position.y <= 0 || this.position.y + this.height >= CanvasHelper.getHeight();
    }

    checkIfHitObstacle(obstacles) {
        return obstacles.some(obstacle => {
            return this.position.x + this.width >= obstacle.position.x && this.position.x <= obstacle.position.x + obstacle.width
                && this.position.y + this.height >= obstacle.position.y && this.position.y <= obstacle.position.y + obstacle.height;
        })
    }

    checkIfReachedFinish(finishArea) {
        return this.position.x >= finishArea.position.x && this.position.x <= finishArea.position.x + finishArea.width
            && this.position.y >= finishArea.position.y && this.position.y <= finishArea.position.y + finishArea.height;
    }

    calculateFitnessFunction(finishArea) {
        if(this.state == IndividualState.WINNER) {
            this.fitnessScore = 100000/this.chromosome.step;
        } else {
            const distance = this.distanceFromPointToRectangle(finishArea); 

            this.fitnessScore = 1/distance;
        }
    }

    distanceFromPointToRectangle(rectangle) {
        // const dy = Math.max(Math.abs(this.position.y - rectangle.position.y), 0); if finish area isn't on whole height
        // return Math.sqrt((dx * dx) + (dy * dy));
        const dx = Math.max(Math.abs(this.position.x - rectangle.position.x), 0);
        return dx;
    }

    clone() {
        const square = new Individual();
        square.chromosome.directions = this.chromosome.directions;

        return square;
    }
}