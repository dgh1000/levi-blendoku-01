import { scale_3_2, colorToHsl, Color } from "./util";



export class Square {
    xc: number;
    yc: number;
    col: Color;
    constructor(xc: number, yc: number, col: Color) {
        this.xc = xc;
        this.yc = yc;
        this.col = col;
    }
}

type Point = {x: number, y: number}

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
        let xc = this.center.x;
        let yc = this.center.y;
        let x0 = xc + s.xc * this.cellSize;
        let y0 = yc + s.yc * this.cellSize;
        let xR = x0 + this.cellSize/2;
        let xL = x0 - this.cellSize/2;
        let yT = y0 - this.cellSize/2;
        let yB = y0 + this.cellSize/2;
        ctx.fillStyle = colorToHsl(s.col);
        ctx.fillRect(xR, yT, xR-xL, yB-yT);
        
    }
}

