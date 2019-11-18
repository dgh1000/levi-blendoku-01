import { scale_3_2, colorToHsl, Color, Point, Rect, colorStep } from "./util";
import { Cell } from "./Cell"

export class Grid {
    center: Point;
    cellSize: number;
    cells: Cell[];
    hasColor: boolean;
    constructor(center: Point, cellSize: number, hasColor: boolean) {
        this.center = center;
        this.cellSize = cellSize;
        this.cells = [];
        this.hasColor = hasColor;
    }

    build(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (this.hasColor) {
            let size: number = 13;
            let colors: Color[] = colorStep({h: 0, s: 0, l: 100}, {h: 0, s: 0, l: 0}, size)
            for(let i = 0; i < size; i++) {
                let offset: number =  1;
                let row: number = 10;
                if (i > row * offset)
                    offset++;
                this.cells.push(new Cell(-size/2+.5 + i, -5, colors[i]))
            }
        } else {
            let size: number = 13;
            for(let i = 0; i < size; i++) {
                let offset: number =  1;
                let row: number = 10;
                if (i > row * offset)
                    offset++;
                this.cells.push(new Cell(-size/2+.5 + i, 3, {h: 0, s: 0, l: 0}))
            }
        }
    }

    draw(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        for (let c of this.cells) {
            c.draw(ctx, this.center, this.cellSize);    
        }
    }

}
