export function constructorExtractor() {
  const self = Object.getPrototypeOf(this);
  return self.constructor;
}
