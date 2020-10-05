class OrganicProperty<V> {
  private _machine: string;
  private _value?: V;

  constructor(machine: string) {
    this._machine = machine;
  }

  get machine(): string {
    return this._machine;
  }

  public value(): V;
  public value(val: V): this;
  public value(val?: V) {
    if (val) {
      this._value = val;
      return this;
    } else {
      return this._value as V;
    }
  }
}

export default OrganicProperty;
