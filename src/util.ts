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

export class Rect {
    upperLeft: Point;
    lowerRight: Point;
    constructor(upperLeft, lowerRight) {
        this.upperLeft = upperLeft;
        this.lowerRight = lowerRight;
    }

    rect(ctx: CanvasRenderingContext2D) {
        ctx.rect(this.upperLeft.x, this.upperLeft.y, 
                 this.lowerRight.x - this.upperLeft.x,
                 this.lowerRight.y - this.upperLeft.y);
    }
    
    squircle(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.upperLeft.x, this.upperLeft.y+10);
        ctx.arc(this.upperLeft.x+10, this.upperLeft.y+10, 10, Math.PI, 3/2 * Math.PI);
        ctx.moveTo(this.upperLeft.x, this.upperLeft.y + 10);
        ctx.lineTo(this.upperLeft.x, this.lowerRight.y - 9);
        ctx.moveTo(this.upperLeft.x + 10, this.lowerRight.y);
        ctx.arc(this.upperLeft.x + 10, this.upperLeft.y + 40, 10, 1/2*Math.PI, Math.PI);
        ctx.moveTo(this.upperLeft.x + 9, this.lowerRight.y);
        ctx.lineTo(this.lowerRight.x-10, this.lowerRight.y);
        ctx.moveTo(this.lowerRight.x, this.lowerRight.y-10);
        ctx.arc(this.lowerRight.x-10, this.lowerRight.y-10, 10, 0, 1/2*Math.PI);
        ctx.moveTo(this.lowerRight.x, this.lowerRight.y-10);
        ctx.lineTo(this.lowerRight.x, this.upperLeft.y+10);
        ctx.moveTo(this.lowerRight.x-10, this.upperLeft.y);
        ctx.arc(this.lowerRight.x-10, this.upperLeft.y+10, 10, 3/2*Math.PI, 0);
        ctx.moveTo(this.lowerRight.x -10, this.upperLeft.y);
        ctx.lineTo(this.upperLeft.x+10, this.upperLeft.y);
        ctx.closePath();
    }

    within(p: Point): boolean {
        return (this.upperLeft.x <= p.x &&
                this.upperLeft.y <= p.y &&
                this.lowerRight.x >= p.x && 
                this.lowerRight.y >= p.y);
    }
}



export type Color = { h: number, s: number, l: number }

export function colorToHsl(col: Color) {
    return `hsl(${col.h}, ${col.s}%, ${col.l}%`;
}

export function colorStep(beginColor: Color, endColor: Color, nSteps: number): Color[] {
    let out: Color[] = [];
    for(let i: number = 0; i <= nSteps; i++) {
        out.push( {h:(scale_3_2(0, i, nSteps, beginColor.h, endColor.h)),
                   s:(scale_3_2(0, i, nSteps, beginColor.s, endColor.s)),
                   l:(scale_3_2(0, i, nSteps, beginColor.l, endColor.l))});
    }
    return out;
} 

export function centerLines(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0, canv.height/2);
    ctx.lineTo(canv.width, canv.height/2);
    ctx.moveTo(canv.width/2, 0);
    ctx.lineTo(canv.width/2, canv.height);
    ctx.stroke();
}

export function background(canv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
}