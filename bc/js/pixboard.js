import { ColorPalette } from "./colorpicker";
import {
    getFrameData
} from "../../utils/store";
import { NearUtils } from "../../bc/js/near-util";



export class Pixboard {


    static PIX_VERTICAL_BOXES = 20;
    static PIX_HORIZONTAL_BOXES = 30;
    static FRAME_COUNT = Pixboard.PIX_VERTICAL_BOXES * Pixboard.PIX_HORIZONTAL_BOXES;
    static PIX_HEIGHT_BOARD = Pixboard.PIX_VERTICAL_BOXES * 40;
    static PIX_WIDTH_BOARD = Pixboard.PIX_HORIZONTAL_BOXES * 40;

    static PixboardCanvas;
    static PixboardRef;

    static PixboardDataArray = [];

    static async refreshPixelboard(setPixelpartyBoard, setFramesOnSale, sortAttribute, setYourFrames) {

        const resp = await getFrameData();

        setPixelpartyBoard({ loading: false, framedata: resp.data.framedata, metadata: resp.data.metadata });

        let framesOnSaleArray = [];
        resp.data.metadata.forEach((element, index) => {
            if (element.price >= 4 && element.owner != NearUtils.accountId) {
                const newElement = Object.assign({}, element);
                newElement["frameId"] = index;
                framesOnSaleArray.push(newElement);
            }
        });

        framesOnSaleArray.sort((a, b) => {
            return a.price - b.price;
        });
        setFramesOnSale({ frames: framesOnSaleArray, sortAttribute: sortAttribute });


        let yourFrames = [];
        resp.data.metadata.forEach((element, index) => {
            if ((element.owner == NearUtils.accountId || element.coauthor == NearUtils.accountId) && NearUtils.accountId != "") {
                const newElement = Object.assign({}, element);
                newElement["frameId"] = index;
                yourFrames.push(newElement);
            }
        });
        setYourFrames(yourFrames)
    }

    static RenderPixboard(PixboardDataArray) {
        Pixboard.PixboardCanvas.style.width = this.PIX_WIDTH_BOARD + "px";
        Pixboard.PixboardCanvas.style.height = this.PIX_HEIGHT_BOARD + "px";

        var ctx = Pixboard.PixboardCanvas.getContext("2d");
        ctx.canvas.width = this.PIX_WIDTH_BOARD;
        ctx.canvas.height = this.PIX_HEIGHT_BOARD;

        for (let p = 0; p < PixboardDataArray.length; p++) {
            var x_offset = Math.floor(p / this.PIX_HORIZONTAL_BOXES)
            var y_offset = p % this.PIX_HORIZONTAL_BOXES;

            for (let i = 0; i < 400; i++) {

                var row = Math.floor(i / 20);
                var cell = i % 20;
                Pixboard.colorPixboardPixel(row + (20 * y_offset), cell + (20 * x_offset), PixboardDataArray[p][i], ctx);
            }
        }
    }

    static colorPixboardPixel(cx, cy, colorByte, ctx) {
        ctx.fillStyle = ColorPalette.byte_color(colorByte);
        ctx.fillRect((cx) * 2, (cy) * 2, 2, 2);
    }
}