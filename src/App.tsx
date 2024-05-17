import './App.css'
import {Canvas} from "./components/Canvas.tsx";
import {drawParticles, Particle} from "./canvas/draw.ts";
import {useEffect, useRef, useState} from "react";
import {Settings} from "./components/Settings.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import {setOptions} from "./store/optionsSlice.ts";

function App() {
    const options = useSelector((state: RootState) => state.options);
    const dispatch = useDispatch();

    const [fps, setFps] = useState(0);
    const frameTimestamps = useRef<number[]>([]);

    const draw = (ctx: CanvasRenderingContext2D, deltaTime: number, particles: Particle[]) => {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        drawParticles(ctx, particles);

        frameTimestamps.current.push(performance.now());

        if (frameTimestamps.current.length > 100) {
            frameTimestamps.current.shift();
        }

        if (frameTimestamps.current.length > 1) {
            const timeDiff = frameTimestamps.current[frameTimestamps.current.length - 1] - frameTimestamps.current[0];
            const averageFps = (frameTimestamps.current.length - 1) / (timeDiff / 1000);
            setFps(Math.round(averageFps));
        }
    }

    useEffect(() => {
        const handleResize = () => {
            dispatch(setOptions({
                ...options,
                height: window.innerHeight,
                width: window.innerWidth,
            }));
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return (
        <>
            <Settings fps={fps}/>
            <Canvas draw={draw} options={options}/>
        </>
    )
}

export default App
