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

export const createParticles = (ctx: CanvasRenderingContext2D, particles: Particle[], group: { amount: number; color: string, radius: number }, index: number) => {
    const groupParticles = [];
    for(let i = 0; i < group.amount; i++){
        groupParticles.push(new Particle(randomCanvas(ctx), randomCanvas(ctx), 0, 0, group.radius, group.color, index));
        particles.push(groupParticles[i]);
    }
    return groupParticles;
}

export const drawParticles = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    for(let i = 0; i < particles.length; i++){
        drawCircle(ctx, particles[i].x, particles[i].y, particles[i].c, particles[i].r);
    }
}

export const fillCells = (cells: Cell[][], particles: Particle[], cellSize: number) => {
    for(let i = 0; i < cells.length; i++) {
        for(let j = 0; j < cells[i].length; j++) {
            cells[i][j].particles = [];
        }
    }

    for(let i = 0; i < particles.length; i++) {
        const x = Math.floor(particles[i].x/cellSize);
        const y = Math.floor(particles[i].y /cellSize);
        if(x >= 0 && x < cells.length && y >= 0 && y < cells[x].length) {
            cells[x][y].addParticle(particles[i]);
        }
    }

}

export const createCells = (ctx: CanvasRenderingContext2D, apprCellSize: number) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const cellCountX = Math.round(width / apprCellSize);
    const cellSize = width / cellCountX;
    const cellCountY = Math.round(height / cellSize);

    const cells = new Array(cellCountX).fill(null).map(() => new Array(cellCountY).fill(new Cell()));
    return cells;
}

export const drawCells = (ctx: CanvasRenderingContext2D, cells: Cell[][], cellSize: number) => {
    for(let i = 0; i < cells.length; i++) {
        for(let j = 0; j < cells[i].length; j++) {
            ctx.strokeStyle = '#111';
            ctx.shadowBlur = 0;
            ctx.strokeRect( cellSize * i, cellSize * j, cellSize, cellSize);
        }
    }
}

export const drawCanvas = (ctx: CanvasRenderingContext2D, particles: Particle[], cells: Cell[][], cellSize: number) => {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    drawCells(ctx, cells, cellSize)
    drawParticles(ctx, particles);
    console.log(cells[0][0].particles.length);
    fillCells(cells, particles, cellSize);
}
