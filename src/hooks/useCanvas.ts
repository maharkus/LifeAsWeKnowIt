
import {useRef, useEffect, useCallback} from 'react'
import {createCells, createParticles} from "../canvas/draw.ts";
import {rule} from "../canvas/particle_movement.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {Particle} from "../canvas/Particle.ts";
import {Cell} from "../canvas/Cell.ts";
import {setFps} from "../store/fpsSlice.ts";
import {calculateFps} from "../functions/helpers.ts";




const useCanvas = (draw: (ctx: CanvasRenderingContext2D, particles: Particle[], cells: Cell[][]) => void) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const drawCallback = useCallback(draw, [draw]);
    const particles = useRef<Particle[]>([]);
    const groups = useRef<Particle[][]>([[], [], []]);
    const cells = useRef<Cell[][]>([]);
    const options = useSelector((state: RootState) => state.options);
    const optionsRef = useRef(options);
    const dispatch = useDispatch();

    const createContext = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        return canvas.getContext('2d');
    }

    const initParticles = (ctx: CanvasRenderingContext2D) => {
        particles.current.length = 0;
        for (let i = 0; i < optionsRef.current.particleGroups.length; i++) {
            groups.current[i] = createParticles(ctx, particles.current, optionsRef.current.particleGroups[i].amount, optionsRef.current.particleGroups[i].radius, optionsRef.current.particleGroups[i].color);
        }
    }

    const applyRules = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
        for (const r of optionsRef.current.rules) {
            rule(ctx, groups.current[r.group1], groups.current[r.group2], r.weight, deltaTime);
        }
    }

    useEffect(() => {
        optionsRef.current = options; // Update the ref whenever options change
    }, [options]);

    useEffect(() => {
        const ctx = createContext(canvasRef.current);
        if (!ctx) return;

        initParticles(ctx);
        cells.current = createCells(ctx, optionsRef.current.cellSize);


        const currentParticles = particles.current;
        const currentGroups = groups.current;
        let animationFrameId: number;
        let lastTimestamp: number;
        let fps = 0;
        const fpsValues: {timestamp: number, fps: number}[] = [];
        let fpsUpdateTimestamp = performance.now();

        const render = (timestamp: number) => {
            let deltaTime = 0;

            if(lastTimestamp){
                deltaTime = (timestamp - lastTimestamp) / 1000;
            }

            drawCallback(ctx, particles.current, cells.current);
            applyRules(ctx, deltaTime);

            fps = 1 / deltaTime;
            fpsValues.push({timestamp, fps});

            if (timestamp - fpsUpdateTimestamp >= 200) {
                dispatch(setFps(calculateFps(fpsValues, timestamp, deltaTime)));
                fpsUpdateTimestamp = timestamp;
            }
            lastTimestamp = timestamp;
            animationFrameId = window.requestAnimationFrame(render)
        }

        render(performance.now())


        return () => {
            window.cancelAnimationFrame(animationFrameId);
            currentParticles.length = 0;
            currentGroups.forEach(group => group.length = 0);
        }
    }, []);

    return canvasRef
}

export default useCanvas
