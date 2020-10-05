class OrganicProperty<V> {
  protected _machine: string;
  protected _value?: V;

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
    } else if (this._children.length > 0) {
      return this._children.value();
    } else {
      return this._value as V;
    }
  }


}

export default OrganicProperty;
