import {Particle} from "./draw.ts";

export const rule = (ctx: CanvasRenderingContext2D, group1: Particle[], group2: Particle[], g: number, deltaTime:number) =>{
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    for(let i = 0; i < group1.length; i++) {

        let fx = 0;
        let fy = 0;
        const a = group1[i]
        for (let j = 0; j < group2.length; j++) {
            const b = group2[j]



            const dx = (a.x - b.x + width / 2) % width - width / 2;
            const dy = (a.y - b.y + height / 2) % height - height / 2;

            const d = Math.sqrt(dx * dx + dy * dy);
            if (d > a.r && d < 150){
                const F = g / d;
                fx += (F * dx);
                fy += (F * dy);
            }
        }


        a.vx = (a.vx + fx) * deltaTime * 2;
        a.vy = (a.vy + fy) * deltaTime * 2;

        a.x += a.vx;
        a.y += a.vy;

        if(a.x < 0) a.x = ctx.canvas.width;
        if(a.x > ctx.canvas.width) a.x = 0;
        if(a.y < 0) a.y = ctx.canvas.height;
        if(a.y > ctx.canvas.height) a.y = 0;
    }
}
