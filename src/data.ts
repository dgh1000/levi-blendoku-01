import { scale_3_2, colorToHsl, Color, Point, Rect, colorStep } from "./util";

export class Cell {
    col: number;
    row: number;
    currentColor: Color | void;
    correctColor: Color | void;
    selected: boolean;
    constructor(col: number, row: number, currentColor ?: Color, correctColor ?: Color) {
        this.col = col;
        this.row = row;
        this.selected = false;
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

    computeRect(center: Point, cellSize: number): Rect {
        let cellPoint: Point = center.add(new Point(this.col*cellSize, this.row*cellSize))
        let size: Point = new Point(1, 1).scale(cellSize/2);
        let ul: Point = cellPoint.sub(size);
        let lr: Point = cellPoint.add(size);
        return new Rect(ul, lr);
    }

    draw(ctx: CanvasRenderingContext2D, center: Point, cellSize: number): void {
        {
            // 
            let r: Rect = this.computeRect(center, cellSize);
            ctx.beginPath();
            r.rect(ctx);
            ctx.closePath();
            if (this.currentColor) {
                ctx.fillStyle = colorToHsl(this.currentColor);
                ctx.fill();
                ctx.lineWidth = 1;
                if (this.selected)
                    ctx.lineWidth = 3;
                ctx.strokeStyle = "white";
            } else {
                ctx.lineWidth = 1;
                if (this.selected)
                    ctx.lineWidth = 3;
                ctx.strokeStyle = "white";
            }
            ctx.stroke();
        }
    }
}

export class Grid {
    center: Point;
    cellSize: number;
    cells: Cell[];
    constructor(center: Point, cellSize: number, cells: Cell[]) {
        this.center = center;
        this.cellSize = cellSize;
        this.cells = cells
    }

    draw(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        for (let c of this.cells) {
            c.draw(ctx, this.center, this.cellSize);    
        }
    }

    findSelectedCell(): Cell | void {
        for(let c of this.cells) {
            if (c.selected)
                return c;
        }
        return null;
    }

    findClickedCell(p: Point): Cell | void {
        for(let c of this.cells) {
            if (c.computeRect(this.center, this.cellSize).within(p))
                return c;
        }
        return null;
    }

    receiveClick(event: MouseEvent) {
        // states that are relevent
        //
        //   input state:
        //      selected cell or none
        //      clicked cell or none
        //   output state:
        //      changing colors of cells if necessary
        //      changing selection if necessary
        //
        let xClick = event.offsetX;
        let yClick = event.offsetY;
        let selected = this.findSelectedCell();
        let clicked = this.findClickedCell(new Point(xClick, yClick));
        if (!clicked)
            return;

        if(!selected) {
            if (clicked.currentColor)
                clicked.selected = true;
            return;
        }

        let hold = selected.currentColor;
        selected.currentColor = clicked.currentColor;
        clicked.currentColor = hold;
        selected.selected = false;
    }

    isCorrect(): boolean {
        for(let cell of this.cells) {
            if (cell.correctColor) {
                if (cell.currentColor){
                    if (cell.correctColor.h != cell.currentColor.h ||
                        cell.correctColor.s != cell.currentColor.s ||
                        cell.correctColor.l != cell.currentColor.l)
                        return false;
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }
}
