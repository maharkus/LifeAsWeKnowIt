import { configureStore } from '@reduxjs/toolkit';
import optionsReducer from './optionsSlice';
import fpsReducer from './fpsSlice.ts';

export const store = configureStore({
    reducer: {
        options: optionsReducer,
        fps: fpsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
