import { scale_3_2, colorToHsl, Color, Point, Rect, colorStep } from "./util";



export class Cell {
    col: number;
    row: number;
    currentColor: Color | void;
    correctColor: Color | void;
    constructor(col: number, row: number, currentColor ?: Color, correctColor ?: Color) {
        this.col = col;
        this.row = row;
        if (currentColor) {
            this.currentColor = currentColor
        } else {
            this.currentColor = null;
        }
        if (correctColor) {
            this.correctColor = correctColor
        } else {
            this.correctColor = null;
        }

    }
    computeRect(col: number, row: number, center: Point, cellSize: number): Rect {
        let cellPoint: Point = center.add(new Point(col*cellSize, row*cellSize))
        let size: Point = new Point(1, 1).scale(cellSize/2);
        let ul: Point = cellPoint.sub(size);
        let lr: Point = cellPoint.add(size);
        return new Rect(ul, lr);
    }

    draw(ctx: CanvasRenderingContext2D, center: Point, cellSize: number): void {
        let r: Rect = this.computeRect(this.col, this.row, center, cellSize);
        ctx.beginPath();
        r.rect(ctx);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.stroke
        ctx.stroke();
        if (this.currentColor) {
            ctx.fillStyle = colorToHsl(this.currentColor);
            ctx.fill();
        }
    }
}





export class Grid {
    center: Point;
    cellSize: number;
    cells: Cell[];
    constructor(center: Point, cellSize: number) {
        this.center = center;
        this.cellSize = cellSize;
        this.cells = [];
        let size: number = 13;
        let colors: Color[] = colorStep({h: 200, s: 50, l: 50}, {h: 250, s: 90, l: 50}, size)
        for(let i = 0; i < size; i++) {
            this.cells.push(new Cell(-Math.floor(size/2) + i, -5, colors[i]))
        }
    }

    draw(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        for (let c of this.cells) {
            c.draw(ctx, this.center, this.cellSize);    
        }
    }

}
