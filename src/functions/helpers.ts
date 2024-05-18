export interface Options {
    height: number;
    width: number;
    cellSize: number;
    particleGroups: { amount: number; color: string, radius: number }[];
    rules: { group1: number; group2: number; weight: number }[];
}

export const calculateFps = (fpsValues: {timestamp: number, fps: number}[], timestamp: number, deltaTime: number) => {
    const fps = 1 / deltaTime;
    fpsValues.push({timestamp, fps});
    const validFpsValues = fpsValues.filter(value => value.fps < 1000);
    const averageFps = validFpsValues.reduce((sum, value) => sum + value.fps, 0) / validFpsValues.length;
    return Math.round(averageFps);
}
