import {Slider} from "./Slider.tsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {setOptions} from "../store/optionsSlice.ts";

interface Props {
    fps: number;
}

export const Settings = ({fps} : Props) => {
    const [isMenuOpen, setMenuOpen] = useState(true);
    const options = useSelector((state: RootState) => state.options);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    const handleSliderChange = (index: number, newValue: number) => {
        const newOptions = {...options};
        newOptions.rules = newOptions.rules.map((rule, ruleIndex) =>
            ruleIndex === index ? {...rule, weight: newValue} : rule
        );
        dispatch(setOptions(newOptions));
    }

    const randomizeValues = () => {
        const newOptions = {...options};
        newOptions.rules = newOptions.rules.map((rule) => ({
            ...rule,
            weight: Math.random() * 40 - 20
        }));
        dispatch(setOptions(newOptions));
    }

    return (
        <>

            <button onClick={toggleMenu} className={"absolute text-white z-10"}>
                {isMenuOpen ? 'Hide' : 'Show'} Menu
            </button>
            {isMenuOpen && (
                <div className="absolute p-6 flex flex-col">
                    <h2 className={"text-white"}>Settings</h2>
                    <p className={"text-white"}>FPS: {fps}</p>
                    {options.rules.map((rule, index) => (
                        <Slider key={index} label={rule.group1 + " attracted by " + rule.group2} value={rule.weight} onChange={(newValue) => handleSliderChange(index, newValue)} />
                    ))}
                    <button onClick={randomizeValues} className={"text-white z-10"}>
                        Randomize
                    </button>
                </div>
            )}
        </>
    );
};
