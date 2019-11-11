import { scale_3_2, colorToHsl, Color, Point, Rect } from "./util";



export class Cell {
    col: number;
    row: number;
    color: Color;
    constructor(col: number, row: number, color: Color) {
        this.col = col;
        this.row = row;
        this.color = color;
    }

    computeRect(col: number, row: number, center: Point): Rect {
        let w: number = 50;
        let cellPoint: Point = center.add(new Point(col*w, row*w))
        let size: Point = new Point(1, 1).scale(w/2);
        let ul: Point = cellPoint.sub(size);
        let lr: Point = cellPoint.add(size);
        return new Rect(ul, lr);
    }

    draw(ctx: CanvasRenderingContext2D, center: Point): void {
        let r: Rect = this.computeRect(this.col, this.row, center);
        ctx.beginPath();
        r.rect(ctx);
        ctx.closePath();
        ctx.fillStyle = colorToHsl(this.color);
        ctx.fill();
    }
}



/*
export class Grid {
    center: Point;
    cellSize: number;
    squares: Square[];
    constructor(center: Point, cellSize: number) {
        this.center = center;
        this.cellSize = cellSize;
    }
    draw2(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(100, 100, 25, 25);
    }

    draw(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        for (let s of this.squares) {
            this.drawOneSquare(ctx, s);
        }
    }

    drawOneSquare(ctx: CanvasRenderingContext2D, s: Square) {
        let xCenterCoord = this.center.x;
        let yCenterCoord = this.center.y;
        let xCellCenterCoord = xCenterCoord + s.xCell * this.cellSize;
        let yCellCenterCoord = yCenterCoord + s.yCell * this.cellSize;
        let xR = xCellCenterCoord + this.cellSize/2;
        let xL = xCellCenterCoord - this.cellSize/2;
        let yT = yCellCenterCoord - this.cellSize/2;
        let yB = yCellCenterCoord + this.cellSize/2;
        ctx.fillStyle = colorToHsl(s.col);
        ctx.fillRect(xR, yT, xR-xL, yB-yT);
        
    }
}
*/
