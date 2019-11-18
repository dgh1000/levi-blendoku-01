import { Color, Point, Rect, colorToHsl } from "./util";
import { Cell } from "./Cell";

export class Full extends Cell {
    constructor(col: number, row: number, current: Color) {
        super(col, row, current)
        this.isDraggable = true;
    }
}