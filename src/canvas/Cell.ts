import {Particle} from "./Particle.ts";

export class Cell {
    particles: Particle[];
    constructor(particles?: Particle[]) {
        this.particles = particles ? particles : []
    }

    public addParticle(particle: Particle) {
        this.particles.push(particle);
    }
}
