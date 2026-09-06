import type { CapacitorThermalPrinterPlugin } from './definitions';
type PickByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
};
type WrappedMethods = keyof PickByType<CapacitorThermalPrinterPlugin, (...args: any[]) => CapacitorThermalPrinterPlugin> | 'write';
type FixedArray<T, L> = readonly T[] & {
    length: L;
};
export type WrappedMethodsArgsMap = {
    [P in WrappedMethods]: FixedArray<string, Required<Parameters<CapacitorThermalPrinterPlugin[P]>>['length']>;
};
type Promisable<T> = T | PromiseLike<T>;
export type WrappedMethodsMiddlewareMap<T extends WrappedMethodsArgsMap> = {
    [P in WrappedMethods]?: (...args: Parameters<CapacitorThermalPrinterPlugin[P]>) => Promisable<Record<T[P][number], unknown>>;
};
export {};
