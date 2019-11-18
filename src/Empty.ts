import { Color, Point, Rect, colorToHsl } from "./util";
import { Cell } from "./Cell";

 export class Empty extends Cell {
     correct: Color;
     constructor(col: number, row: number, current: Color, correct: Color, ) {
         super(col, row, current);
         this.correct = correct;
         this.isDraggable = false;
     }

     draw(ctx: CanvasRenderingContext2D, center: Point, cellSize: number) {
        let r: Rect = this.computeRect(this.col, this.row, center, cellSize);
        if (!this.current) {
            r.squircle(ctx);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "white";
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            r.rect(ctx);
            ctx.closePath();
            ctx.fillStyle = colorToHsl(this.current);
            ctx.fill();
        }
     }

     isCorrect() {
        return (this.current === this.correct); 
     }
 }