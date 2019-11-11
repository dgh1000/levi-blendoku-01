import { Square, Grid, Cell } from "./data";
import { Point, Color, Rect, colorToHsl } from "./util";

let canv = document.getElementById("canv") as HTMLCanvasElement;
let ctx = canv.getContext("2d");

function main() {
    let c1: Cell = new Cell(0, 0, {h: 255, s: 1, l: 1});
    c1.draw(ctx, new Point(canv.width/2, canv.height/2));
}





function main2() {
    let p1 = new Point(100, 100);
    let p2 = new Point(500, 500);
    let r1: Rect = new Rect(p1, p2)
    let r2: Rect = new Rect(new Point(300, 300), new Point(600, 600));
    ctx.strokeStyle = "red";
    ctx.beginPath();
    r1.rect(ctx);
    r2.rect(ctx);
    ctx.closePath();
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.stroke();
}



main();





