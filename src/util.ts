export function scale_3_2(x0: number, x1: number, x2: number, 
    y0: number, y1:number): number {
    return y0 + (y1-y0)*(x1-x0)/(x2-x0);
}

export type Color = { h: number, s: number, l: number }

export function colorToHsl(col: Color) {
    return `hsl(${col.h}, ${col.s}%, ${col.l}%`;
}