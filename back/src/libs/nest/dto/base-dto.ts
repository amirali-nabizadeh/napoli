type NonFunctionProperties<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

// Utility type to create a DTO from the entity
export type Dto<T, Excluded extends keyof T = never> = Pick<
  T,
  Exclude<NonFunctionProperties<T>, Excluded>
>;
