import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const fpsSlice = createSlice({
    name: 'fps',
    initialState: 0,
    reducers: {
        setFps: (_, action: PayloadAction<number>) => {
            return action.payload;
        },
    },
});

export const { setFps } = fpsSlice.actions;

export default fpsSlice.reducer;
