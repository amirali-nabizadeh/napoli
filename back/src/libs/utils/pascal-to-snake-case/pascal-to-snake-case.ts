export function pascalToSnakeCase(input: string) {
  return convertContinuesCapitalLetters(input)
    .replace(/\.?([A-Z])/g, function (x, y) {
      return '_' + y.toLowerCase();
    })
    .replace(/^_/, '');
}

function convertContinuesCapitalLetters(input: string) {
  return input
    .replace(/([A-Z][A-Z]+)/g, (g) => `_${g.toLowerCase()}`)
    .replace(/^_/, '');
}
