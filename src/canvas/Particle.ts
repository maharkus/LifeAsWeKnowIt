

export class Particle {
    data: Float32Array;
    c: string;
    closeParticles: Particle[] = [];
    group: number;
    constructor(x:number, y:number, vx: number, vy: number, r:number, c: string, group: number) {
        this.data = new Float32Array(5);
        this.data[0] = x;
        this.data[1] = y;
        this.data[2] = vx;
        this.data[3] = vy;
        this.data[4] = r;
        this.c = c;
        this.group = group;
    }

    get x() {
        return this.data[0];
    }

    set x(value: number) {
        this.data[0] = value;
    }

    get y() {
        return this.data[1];
    }

    set y(value: number) {
        this.data[1] = value;
    }

    get vx() {
        return this.data[2];
    }

    set vx(value: number) {
        this.data[2] = value;
    }

    get vy() {
        return this.data[3];
    }

    set vy(value: number) {
        this.data[3] = value;
    }

    get r() {
        return this.data[4];
    }

    set r(value: number) {
        this.data[4] = value;
    }
}
