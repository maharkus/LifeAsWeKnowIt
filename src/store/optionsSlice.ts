import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Options} from "../functions/helpers.ts";

const initialState: Options = {
    height: window.innerHeight,
    width: window.innerWidth,
    particleGroups: [
        {amount: 400, color: "#2b82b2", radius: 1},
        {amount: 300, color: "#ff6e6e", radius: 1},
        {amount: 400, color: "#6effdd", radius: 1}
    ],
    rules : [
        {group1: 0, group2: 0, weight: 20},
        {group1: 0, group2: 1, weight: -10},
        {group1: 1, group2: 0, weight: 10},
        {group1: 1, group2: 1, weight: -10},
        {group1: 1, group2: 2, weight: 20},
        {group1: 2, group2: 0, weight: -10},
        {group1: 2, group2: 2, weight: 2}
    ]
};

export const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setOptions: (state, action: PayloadAction<Options>) => {
            return action.payload;
        },
    },
});

export const { setOptions } = optionsSlice.actions;

export default optionsSlice.reducer;
