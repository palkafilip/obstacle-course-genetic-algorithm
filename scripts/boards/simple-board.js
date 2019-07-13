import { CanvasHelper } from "../utils/canvas-helper.js";
import { Obstacle } from "../objects/obstacle.js";
import { Pair } from "../utils/pair.js";
import { Rectangle } from "../objects/rectangle.js";

export class SimpleBoard {

    constructor() {
        this.obstacles = this.getObstacles();
        this.startArea = this.getStartArea();
        this.finishArea = this.getFinishArea();
        this.startFinishAreas = [this.startArea, this.finishArea];
        this.background = new Image();
        this.background.src = 'assets/sky-background.jpg';
    }

    getObstacles() {
        const obstacles = []
        obstacles.push(new Obstacle(new Pair(400, 0), 20, 250));
        obstacles.push(new Obstacle(new Pair(800, 50), 20, 250));
        obstacles.push(new Obstacle(new Pair(CanvasHelper.getWidth() - 220, 250), 20, CanvasHelper.getHeight() - 250));

        return obstacles;
    }

    getStartArea() {
        const areaWidth = 200;
        const areaHeight = 400;

        return new Rectangle(new Pair(0, 0), areaWidth, areaHeight, 'lightgreen');
    }

    getFinishArea() {
        const areaWidth = 200;
        const areaHeight = 400;

        return new Rectangle(new Pair(CanvasHelper.getWidth() - areaWidth, CanvasHelper.getHeight() - areaHeight), areaWidth, areaHeight, 'red');
    }
}