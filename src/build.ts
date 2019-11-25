import { scale_3_2, colorToHsl, Color, Point, Rect, colorStep } from "./util";
import { Grid, Cell } from "./data";

export function build1(center, size, amount): Grid {
    let g: Grid = new Grid(center, size);
    let out: Cell[] = [];
    let colors: Color[] = colorStep({h: 0, s: 50, l: 25}, {h: 100, s: 50, l: 75}, size);
    for(let i = 0; i < amount; i++) {
        let offset: number =  1;
        let row: number = 10;
        out.push(new Cell(-amount/2+.5 + i, -5, colors[i]));
        out.push(new Cell(-amount/2+.5 + i, -4,));
    }
    g.cells = out;
    return g;
}