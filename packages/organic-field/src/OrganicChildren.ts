class OrganicChildren<V> extends Array {
  constructor() {
    super();
  }
  public value(): V {
    return this.reduce((curr, item) => {
      return { ...curr, [item.machine]: item.value() };
    }, {});
  }
}
