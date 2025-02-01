export class Step<T> {
  constructor(
    private entity: (new (...args: any) => T) | string,
    public data: any[],
  ) {}

  getModelName() {
    return this.entity?.['modelName'] ?? this.entity;
  }
}
