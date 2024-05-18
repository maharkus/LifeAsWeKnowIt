import './App.css'
import {Canvas} from "./components/Canvas.tsx";
import {drawCanvas} from "./canvas/draw.ts";
import {useEffect} from "react";
import {Settings} from "./components/Settings.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import {setOptions} from "./store/optionsSlice.ts";

function App() {
    const options = useSelector((state: RootState) => state.options);
    const dispatch = useDispatch();

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
            <Settings/>
            <Canvas draw={drawCanvas}/>
        </>
    )
}

export default App
