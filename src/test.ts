import { Cell, Grid } from "./data";
import { Point, Color, Rect, colorToHsl, centerLines, colorStep } from "./util";

let canv = document.getElementById("canv") as HTMLCanvasElement;
let ctx = canv.getContext("2d");  

canv.addEventListener('click', main2, false);



function main() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    let center = new Point(canv.width/2, canv.height/2);
    let hasColors = new Grid(center, 50);
    hasColors.draw(canv, ctx);
    centerLines(canv, ctx);
}

function main2(event ?): void {
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

main2();



