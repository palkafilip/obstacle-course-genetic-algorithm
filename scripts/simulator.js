import { Population } from "./ga-structures/population.js";
import { Game } from "./game.js";
import { SimpleBoard } from "./boards/simple-board.js";
import { TournamentSelection } from "./ga-operators/tournament-selection.js";
import { RandomBestSelection } from "./ga-operators/random-best-selection.js";
import { Crossover } from "./ga-operators/cross-over.js";
import { Mutation } from "./ga-operators/mutation.js";

export class Simulator {

    constructor() {
        this.population = new Population(
            20,
            new TournamentSelection(5),
            new Crossover(10),
            new Mutation(0.05)
            );

        this.board = new SimpleBoard();
        this.game = new Game(this.population, this.board);
        this.game.start();

        this.counter = 0;
        addEventListener('gameEnds', this.gameEndsEventHandler.bind(this));
    }

    gameEndsEventHandler(event) {
        if(this.counter < 100) {
            this.game = new Game(event.detail, this.board);
            this.game.start();
            this.counter++;
        }

    }
}

new Simulator();