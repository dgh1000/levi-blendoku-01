import { Cell, Grid } from "./data";
import { Point, Color, Rect, colorToHsl, centerLines } from "./util";

let canv = document.getElementById("canv") as HTMLCanvasElement;
let ctx = canv.getContext("2d");

function main() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    let center = new Point(canv.width/2, canv.height/2);
    let hasColors = new Grid(center, 50);
    hasColors.draw(canv, ctx);
    centerLines(canv, ctx);
}


main();





