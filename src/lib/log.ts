let isLogEnabled: boolean = false;

export function enableLog(enable: boolean = true): void {
  isLogEnabled = enable;
}

export function createLogger(
  namespace: string = "binpackingjs"
): (...args: any[]) => void {
  return log.bind(undefined, namespace);
}

export function log(namespace: string, ...args: any[]): void | undefined {
  return isLogEnabled
    ? console.debug.apply(console, [namespace].concat(args))
    : undefined;
}
