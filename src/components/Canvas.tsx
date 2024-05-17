import useCanvas from "../hooks/useCanvas.ts";
import {Particle} from "../canvas/draw.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";


interface Props {
    draw: (ctx: CanvasRenderingContext2D, deltaTime: number, particles: Particle[])=>void;
}
export const Canvas = ({draw}: Props) => {
    const options = useSelector((state: RootState) => state.options);

    const canvasRef = useCanvas(draw)

    return (
        <canvas ref={canvasRef} height={options.height} width={options.width} ></canvas>
    );
};
