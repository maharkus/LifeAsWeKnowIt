


const randomCanvas = (ctx: CanvasRenderingContext2D) => {
    return Math.floor(Math.random() * ctx.canvas.width);
}

export class Particle {
    x: number;
    y: number;
    c: string;
    r: number;
    vx: number;
    vy: number;
    constructor(x:number, y:number, c:string, r:number) {
        this.x = x;
        this.y = y;
        this.c = c;
        this.r = r;
        this.vx = 0;
        this.vy = 0;

    }
}

export const drawCircle = (ctx: CanvasRenderingContext2D, x:number,y:number,c:string,r:number) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.shadowBlur = 10;
    ctx.shadowColor = c;
    ctx.fill();
}

export const createParticles = (ctx: CanvasRenderingContext2D, particles: Particle[], amount: number, color: string) => {
    const group = [];
    for(let i = 0; i < amount; i++){
        group.push(new Particle(randomCanvas(ctx), randomCanvas(ctx), color, 1.5));
        particles.push(group[i]);
    }
    return group;
}

export const drawParticles = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    for(let i = 0; i < particles.length; i++){
        drawCircle(ctx, particles[i].x, particles[i].y, particles[i].c, particles[i].r);
    }
}