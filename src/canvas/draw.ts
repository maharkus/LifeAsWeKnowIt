import {Particle} from "./Particle.ts";
import {Cell} from "./Cell.ts";


const randomCanvas = (ctx: CanvasRenderingContext2D) => {
    return Math.floor(Math.random() * ctx.canvas.width);
}

export const drawCircle = (ctx: CanvasRenderingContext2D, x:number,y:number,c:string,r:number) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.shadowBlur = 10;
    ctx.shadowColor = c;
    ctx.fill();
}

export const createParticles = (ctx: CanvasRenderingContext2D, particles: Particle[], amount: number, radius: number, color: string) => {
    const group = [];
    for(let i = 0; i < amount; i++){
        group.push(new Particle(randomCanvas(ctx), randomCanvas(ctx), 0, 0, radius, color));
        particles.push(group[i]);
    }
    return group;
}

export const drawParticles = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    for(let i = 0; i < particles.length; i++){
        drawCircle(ctx, particles[i].x, particles[i].y, particles[i].c, particles[i].r);
    }
}

export const createCells = (ctx: CanvasRenderingContext2D, apprCellSize: number) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const cellCountX = Math.round(width / apprCellSize);
    const cellSize = width / cellCountX;
    const cellCountY = Math.round(height / cellSize);

    const cells = new Array(cellCountX).fill(null).map(() => new Array(cellCountY).fill(new Cell(cellSize, cellSize)));
    return cells;
}

export const drawCells = (ctx: CanvasRenderingContext2D, cells: Cell[][]) => {
    for(let i = 0; i < cells.length; i++) {
        for(let j = 0; j < cells[i].length; j++) {
            ctx.strokeStyle = '#111';
            ctx.shadowBlur = 0;
            ctx.strokeRect( cells[i][j].width * i, cells[i][j].height * j, cells[i][j].width, cells[i][j].height);
        }
    }
}


export const drawCanvas = (ctx: CanvasRenderingContext2D, particles: Particle[], cells: Cell[][]) => {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    drawCells(ctx, cells)
    drawParticles(ctx, particles);
}
