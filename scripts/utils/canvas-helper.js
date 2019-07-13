export class CanvasHelper {

    static getCanvas() {
        return document.getElementById("myCanvas");
    }

    static getHeight() {
        const canvas = document.getElementById("myCanvas");
        return canvas.height;
    }

    static getWidth() {
        const canvas = document.getElementById("myCanvas");
        return canvas.width;
    }
}