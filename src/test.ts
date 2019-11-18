import { Cell } from "./Cell";
import { Grid } from "./Grid";
import { Point, Color, Rect, colorToHsl, centerLines, colorStep, background } from "./util";
import { Empty } from "./Empty";

let canv = document.getElementById("canv") as HTMLCanvasElement;
let ctx = canv.getContext("2d");  

canv.addEventListener('click', main2, false);
setInterval(main2, 1000/15);
let i = 0;

function main() {
    background(canv, ctx);
    let center = new Point(canv.width/2, canv.height/2);
    let hasColors = new Grid(center, 50, true);
    let emptyCell = new Grid(center, 50, false);
    hasColors.build(canv, ctx);
    hasColors.draw(canv, ctx);
    emptyCell.build(canv, ctx);
    emptyCell.draw(canv, ctx);
    // centerLines(canv, ctx);
}

function main3(event ?): void {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    let r = new Rect(new Point(canv.width/2-50, canv.height/2-50), new Point(canv.width/2+50, canv.height/2+100))
    ctx.beginPath();
    r.rect(ctx);
    ctx.closePath();
    ctx.fillStyle = "purple";
    ctx.fill();
    // console.log("LIMITS X: " + (r.upperLeft.x) + ", " + (r.upperLeft.y));
    // console.log("LIMITS Y: " + (r.lowerRight.x) + ", " + (r.lowerRight.y));
    // console.log("event.page : (" + event.pageX + ", " + event.pageY + ")");
    // console.log("event.offset : (" + event.offsetX + ", " + event.offsetY + ")");
    if (event)
        console.log(r.within(new Point(event.offsetX, event.offsetY)));
    // centerLines(canv, ctx);
}

function main2(event? : any): void {
    background(canv, ctx);
    let center = new Point(canv.width/2, canv.height/2);
    let test: Empty = new Empty(0, 0, null, {h: 0, s: 0, l: 0})
    test.draw(ctx, center, 50);
    if (event)
        console.log(test.isWithin(center, 50, new Point(event.offsetX, event.offsetY)));

}

main2();
// main();



