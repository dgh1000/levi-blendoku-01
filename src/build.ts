import { scale_3_2, colorToHsl, Color, Point, Rect, colorStep, shuffle } from "./util";
import { Grid, Cell } from "./data";

export function build1(center, size, amount, offset1, offset2): Grid {
    let out: Cell[] = [];
    let colors: Color[] = colorStep({h: 0, s: 50, l: 50}, {h: 100, s: 50, l: 50}, amount-1);
    let hold: Color[] = [...colors].slice(1, colors.length-1);
    shuffle(hold);
    for(let i = 0; i < hold.length; i++) {
        // let r = Math.floor(Math.random()*(hold.length));
        // let offset: number =  1;
        // let row: number = 10;
        out.push(new Cell(-amount/2+.5 + i, offset1, false, hold[i]));
        // hold.splice(r, 1);
    }
    for(let i = 0; i < colors.length; i++) {

    }
    let g: Grid = new Grid(center, size, out);
    return g;
}

