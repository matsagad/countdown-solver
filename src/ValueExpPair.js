class ValueExpPair {
  constructor(values, expressions) {
    this.values = values;
    this.expressions = expressions;
  }
  concatWith(pair) {
    this.values = [...this.values, ...pair.values];
    this.expressions = [...this.expressions, ...pair.expressions];
  }
}

export default ValueExpPair;