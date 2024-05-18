import {Particle} from "./Particle.ts";

export class Cell {
    particles: Particle[];
    width: number;
    height: number;
    constructor(width: number, height: number, particles?: Particle[]) {
        this.particles = particles ? particles : []
        this.width = width;
        this.height = height;
    }
}
