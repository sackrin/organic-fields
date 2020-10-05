class OrganicProperty<V, A = { [k: string]: any }> {
  protected _machine: string;
  protected _value?: V;
  protected _attributes?: A;

  constructor(machine: string) {
    this._machine = machine;
  }

  get machine(): string {
    return this._machine;
  }

  get attributes(): A {
    return this._attributes;
  }

  // Setting and getting the value of a field
  // To populate field.value('a value');
  // To read field.value();
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

  // Setting and getting attributes of a field
  // Attributes are simple key/value meta data to add non field value data
  // To populate field.attribute('key', 'value);
  // To read field.attribute('key');
  public attribute<I>(name): I;
  public attribute<I>(name, value: I): this;
  public attribute<I>(...args: [string, I] | [string]) {
    const [key, value] = args;
    if (args.length === 1) {
      return this._attributes[key] as I | void;
    } else {
      this._attributes[key] = value as I | void;
      return this;
    }
  };
}

export default OrganicProperty;
