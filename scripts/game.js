import { CanvasHelper } from "./utils/canvas-helper.js";

export class Game {

    constructor(population, board) {
        this.population = population;
        this.board = board;

        this.canvas = CanvasHelper.getCanvas();
        this.ctx = this.canvas.getContext("2d");

        this.endGameCallback = this.endGame.bind(this);

        addEventListener('allDead', this.endGameCallback);
    }

    renderIndividuals() {
        this.population.update(this.board.obstacles, this.board.finishArea);

        this.population.individuals.forEach(individual => {
            this.ctx.fillStyle = individual.color;
            this.ctx.drawImage(individual.image, individual.position.x, individual.position.y, individual.width, individual.height);
        })
    }

    renderObstacles() {
        this.board.obstacles.forEach(obstacle => {
            this.ctx.fillStyle = obstacle.color;
            this.ctx.fillRect(obstacle.position.x, obstacle.position.y, obstacle.width, obstacle.height);
        })
    }

    renderEdgeAreas() {
        this.board.startFinishAreas.forEach(area => {
            this.ctx.fillStyle = area.color;
            this.ctx.fillRect(area.position.x, area.position.y, area.width, area.height);
        })
    }

    renderBackground() {
        this.ctx.drawImage(this.board.background, 0, 0, CanvasHelper.getWidth(), CanvasHelper.getHeight());
    }

    render() {
        this.clearCanvas();
        this.renderBackground();
        this.renderEdgeAreas();
        this.renderObstacles();
        this.renderIndividuals();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    start() {
        this.interval = setInterval(() => this.render(), 10);
    }

    endGame() {
        clearInterval(this.interval);

        this.population.updatePopulation();
        this.createGameEndsEvent();

        removeEventListener('allDead', this.endGameCallback);
    }

    createGameEndsEvent() {
        const event = new CustomEvent('gameEnds', { detail: this.population });
        dispatchEvent(event);
    }
}