export function scale_3_2(x0: number, x1: number, x2: number, 
    y0: number, y1:number): number {
    return y0 + (y1-y0)*(x1-x0)/(x2-x0);
}



export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    } 

    add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }   
    
    sub(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }

    scale(s: number): Point {
        return new Point(this.x * s, this.y * s);
    }

    len(): number {
        return Math.sqrt(this.x**2 + this.y**2)
    }

    normalize(): Point {
        return this.scale(1/this.len())
    }
}



export type Color = { h: number, s: number, l: number }

export function colorToHsl(col: Color) {
    return `hsl(${col.h}, ${col.s}%, ${col.l}%`;
}