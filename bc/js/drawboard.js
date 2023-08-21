import { Pixboard } from "./pixboard";
import { ColorPalette } from "./colorpicker";
import { StorageManager } from "./localstorage";
import { NearUtils } from "../../bc/js/near-util";
import 'regenerator-runtime/runtime'

export class Drawboard {

    static HEIGHT_BOXES = 20;
    static LENGTH_BOXES = 20;

    static drawMode = false;
    static board;
    static activeFrame = null;
    static canvasInstance = null;
    static previewCanvas = null;

    static initDrawboard(canvas, previewCanvas) {
        this.previewCanvas = previewCanvas;

        var ctx2 = previewCanvas.getContext("2d");
        ctx2.canvas.width = 40;
        ctx2.canvas.height = 40;


        var ctx = canvas.getContext("2d");
        ctx.canvas.width = 600;
        ctx.canvas.height = 600;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;

        ctx.strokeStyle = 'rbga(0, 0, 0, 50)';

        for (var i = 0; i <= Drawboard.LENGTH_BOXES; i++) {
            ctx.moveTo(((i * (ctx.canvas.width / Drawboard.LENGTH_BOXES))), 0);
            ctx.lineTo(((i * (ctx.canvas.width / Drawboard.LENGTH_BOXES))), ctx.canvas.width);
            ctx.stroke();
        }

        for (var i = 0; i <= Drawboard.LENGTH_BOXES; i++) {
            ctx.moveTo(0, ((i * (ctx.canvas.width / Drawboard.LENGTH_BOXES))));
            ctx.lineTo(ctx.canvas.width, (i * (ctx.canvas.width / Drawboard.LENGTH_BOXES)));
            ctx.stroke();
        }

        Drawboard.board = new Array(Drawboard.LENGTH_BOXES);
        for (let i = 0; i < Drawboard.LENGTH_BOXES; ++i) {
            Drawboard.board[i] = new Array(Drawboard.LENGTH_BOXES);
        }

        let drawboardArray = Pixboard.PixboardDataArray[this.activeFrame];
        for (let i = 0; i < drawboardArray.length; i++) {

            var row = Math.floor(i / Drawboard.LENGTH_BOXES);
            var cell = i % Drawboard.LENGTH_BOXES;
            Drawboard.colorPixel(row, cell, ColorPalette.byte_color(drawboardArray[i]), ctx);

        }
    }

    static colorPixel(cx, cy, hexColor, ctx) {
        ctx.fillStyle = hexColor;
        ctx.fillRect((cx * (ctx.canvas.width / Drawboard.LENGTH_BOXES)) + 1, (cy * (ctx.canvas.width / Drawboard.LENGTH_BOXES)) + 1, (ctx.canvas.width / Drawboard.LENGTH_BOXES) - 2, (ctx.canvas.height / Drawboard.HEIGHT_BOXES) - 2);
        Drawboard.board[cx][cy] = ColorPalette.color_byte(hexColor);
        var ctx2 = Drawboard.previewCanvas.getContext("2d");

        ctx2.fillStyle = hexColor;
        ctx2.fillRect((cx) * 2, (cy) * 2, 2, 2);

  // Call autoSave function
        Drawboard.autoSave();
}


    static getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    static getPosition(event, canvas) {
        if (!Drawboard.drawMode) {
            return;
        }

        var pos = Drawboard.getMousePos(canvas, event);
        const posx = pos.x;
        const posy = pos.y;

        // var canvas = document.getElementById("drawboardCanvas");
        var ctx = canvas.getContext("2d");

        let cx = Math.floor(posx / (ctx.canvas.width / Drawboard.LENGTH_BOXES));
        let cy = Math.floor(posy / (ctx.canvas.height / Drawboard.LENGTH_BOXES));

        
        //console.log(cx + " " + cy);
        if (cx >= 0 && cx < Drawboard.LENGTH_BOXES &&
            cy >= 0 && cy < Drawboard.LENGTH_BOXES) {

            Drawboard.colorPixel(cx, cy, ColorPalette.currentColor, ctx);
        } else {
            //console.log("tried to change pixel outside of canvas");
        }
    }

    static async saveFrame(message, coauthor) {

        let frameId = Drawboard.activeFrame;
        let boardData = JSON.stringify(Drawboard.board.toString().split(',').map(function(t) { return parseInt(t) }));
        let compressedData = StorageManager.compress(boardData);

        if (coauthor == NearUtils.accountId) {
            await NearUtils.editFrameimage(frameId, compressedData);
        } else {
            await NearUtils.editFrame(frameId, compressedData, message || "", coauthor || "");
        }
    }
    
    static temporarySave() {
    // Save the drawboard data temporarily in the browser's local storage
        localStorage.setItem("drawboardData", JSON.stringify(Drawboard.board));
}

    static temporaryLoad() {
    // Retrieve the drawboard data from the browser's local storage
        const drawboardData = localStorage.getItem("drawboardData");

        if (drawboardData) {
        Drawboard.board = JSON.parse(drawboardData);
    }
}

    static clearTemporaryData() {
    // Clear the temporary drawboard data from the browser's local storage
        localStorage.removeItem("drawboardData");
}
    
    static autoSave() {
    // Retrieve the drawboard data
        const drawboardData = Drawboard.getDrawboardData();

    // Save the drawboard data temporarily
        Drawboard.temporarySave(drawboardData);

    // Update the drawboard based on the temporary saved data
        Drawboard.updateDrawboard(drawboardData);
}



    static startDraw(event, canvas) {
        Drawboard.drawMode = true;
        Drawboard.getPosition(event, canvas);
    }

    static stopDraw() {
        Drawboard.drawMode = false;
    }
}
