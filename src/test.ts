import { Square, Color, Grid } from "./data";

let canv = document.getElementById("canv") as HTMLCanvasElement;
let ctx = canv.getContext("2d");


let c1: Color = {h: 30, s: 1.0, l: 0.5};
let c2: Color = {h: 120, s: 1.0, l: 0.5};
let d1: Square = new Square(0, 0, c1);
let d2: Square = new Square(-1, 0, c2);

let gr: Grid = new Grid({x: 200, y: 200}, 50);

gr.draw(canv, ctx);





