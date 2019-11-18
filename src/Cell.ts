import { colorToHsl, Color, Point, Rect, colorStep } from "./util";


export class Cell {
    col: number;
    row: number;
    current: Color;
    isDraggable: boolean;
    constructor(col: number, row: number, current: Color) {
        this.col = col;
        this.row = row;
        this.current = current;
    }

    isWithin(center: Point, cellSize: number, point: Point): [boolean, boolean] {
        return [this.computeRect(this.col, this.row, center, cellSize).within(point), this.isDraggable];
     }

    computeRect(col: number, row: number, center: Point, cellSize: number): Rect {
        let cellPoint: Point = center.add(new Point(col*cellSize, row*cellSize))
        let size: Point = new Point(1, 1).scale(cellSize/2);
        let ul: Point = cellPoint.sub(size);
        let lr: Point = cellPoint.add(size);
        return new Rect(ul, lr);
    }

    draw(ctx: CanvasRenderingContext2D, center: Point, cellSize: number): void {
        {
            let r: Rect = this.computeRect(this.col, this.row, center, cellSize);
            ctx.beginPath();
            r.rect(ctx);
            ctx.closePath();
            ctx.fillStyle = colorToHsl(this.current);
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
    }
}