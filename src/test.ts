import { Cell, Grid } from "./data";
import { Point, Color, Rect, colorToHsl, centerLines, colorStep, shuffle } from "./util";
import { build1 } from "./build"


let canv = document.getElementById("canv") as HTMLCanvasElement;
let ctx = canv.getContext("2d");  

// let xs: number[] = [0, 1, 2, 3, 4, 5];
// shuffle(xs);
// console.log(xs);

let grid = build1(new Point(canv.width/2, canv.height/2), 50, 10, -5, 3);
centerLines(canv, ctx);

canv.addEventListener('click', function(evt) {
    grid.receiveClick(evt);
});

function render() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    grid.draw(canv, ctx);
    if (grid.isCorrect())
        console.log(true);
    requestAnimationFrame(render); 
    // execution arrives here and render() exits
}

requestAnimationFrame(render);
// doesn't call it, passes a pointer to render into
// the event system to be called later

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
    // console.log("LIMITS Y: " + (r.lowe rRight.x) + ", " + (r.lowerRight.y));
    // console.log("event.page : (" + event.pageX + ", " + event.pageY + ")");
    // console.log("event.offset : (" + event.offsetX + ", " + event.offsetY + ")");
    if (event)
        console.log(r.within(new Point(event.offsetX, event.offsetY)));
    // centerLines(canv, ctx);
}




