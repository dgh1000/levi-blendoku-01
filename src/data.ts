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
    currentSelection: Cell;
    constructor(center: Point, cellSize: number) {
        this.center = center;
        this.cellSize = cellSize;
        this.cells = [];
        this.currentSelection =  new Cell(null, null);
        let size: number = 13;
        let colors: Color[] = 
            colorStep({h: 200, s: 50, l: 50}, {h: 250, s: 90, l: 50}, size);
        for(let i = 0; i < size; i++) {
            this.cells.push(
                new Cell(-Math.floor(size/2) + i, -5, colors[i])
            );
        }
    }

    draw(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        for (let c of this.cells) {
            c.draw(ctx, this.center, this.cellSize);    
        }
    }

    receiveClick(event: MouseEvent) {
        let xClick = event.offsetX;
        let yClick = event.offsetY;
        let p = new Point(xClick, yClick);
        for(let c of this.cells) {
            if (c.computeRect(this.center, this.cellSize).within(p)) {
                if (this.currentSelection.row == null && this.currentSelection.col == null) {
                    // adds a larger boarder around cell.
                    c.selected = true;
                    this.currentSelection = c;
                }
                else { 
                    // deselection of previously selected cell.
                    // couldnt think of a better way of doing this.
                    for(let j of this.cells) {
                        j.selected = false;
                    }
                    // for clarity's sake.
                    let previousSelection = this.currentSelection
                    // swap the two colors.
                    let holder: Color = previousSelection.currentColor;
                    previousSelection.currentColor = c.currentColor;
                    c.currentColor = holder;
                    this.currentSelection = new Cell(null, null);
                }
            }
        }
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
