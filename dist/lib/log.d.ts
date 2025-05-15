export declare function enableLog(enable?: boolean): void;
export declare function createLogger(namespace?: string): (...args: any[]) => void;
export declare function log(namespace: string, ...args: any[]): void | undefined;
