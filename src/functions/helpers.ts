export interface Options {
    height: number;
    width: number;
    particleGroups: { amount: number; color: string }[];
    rules: { group1: number; group2: number; weight: number }[];
}
