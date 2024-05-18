import useCanvas from "../hooks/useCanvas.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {Particle} from "../canvas/Particle.ts";
import {Cell} from "../canvas/Cell.ts";


interface Props {
    draw: (ctx: CanvasRenderingContext2D, particles: Particle[], cells: Cell[][], cellSize: number)=>void;
}
export const Canvas = ({draw}: Props) => {
    const options = useSelector((state: RootState) => state.options);

    const canvasRef = useCanvas(draw)

    return (
        <canvas ref={canvasRef} height={options.height} width={options.width} ></canvas>
    );
};
