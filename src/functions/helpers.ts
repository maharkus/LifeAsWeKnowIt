export interface Options {
    height: number;
    width: number;
    particleGroups: { amount: number; color: string, radius: number }[];
    rules: { group1: number; group2: number; weight: number }[];
}
