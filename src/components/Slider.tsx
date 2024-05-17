import {ChangeEvent} from "react";

interface Props {
    label: string;
    value: number;
    onChange: (newValue: number) => void;
}
export const Slider = ({label, value, onChange} : Props) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(parseFloat(event.target.value));
    }

    return (
        <div className={"gap-2 flex flex-col"}>
            <label className={"text-white"}>{label}</label>
            <input type="range"  min="-20" max="20" step="1" value={value} className="w-56" id="myRange"
                   onChange={handleChange}></input>
        </div>
    )
};
