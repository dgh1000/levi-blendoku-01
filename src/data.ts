import { scale_3_2, colorToHsl, Color, Point } from "./util";



export class Square {
    xCell: number;
    yCell: number;
    size: number;
    col: Color;
    upRight: Point;
    lowLeft: Point;
    constructor(xc: number, yc: number, col: Color) {
        this.xCell = xc;
        this.yCell = yc;
        this.col = col;
    }
}


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

