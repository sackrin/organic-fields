import OrganicProperty from "@src/OrganicProperty";

class OrganicContainer<V> {
  private _machine: string;
  private _value?: V;
  private _children: OrganicChildren<V> = new OrganicChildren<V>();

  constructor(machine: string) {
    this._machine = machine;
  }

  get machine(): string {
    return this._machine;
  }

  get children(): OrganicChildren<V> {
    return this._children;
  }

  public value(): V;
  public value(val: V): this
  public value(val?: V) {
    if (val) {
      this._value = val;
      return this;
    } else {
      return (this._value as V);
    }
  }

  public child<C>(field: OrganicProperty<C> | OrganicContainer<C>): this {
    this._children.push(field);
    return this;
  }
}

export default OrganicContainer;
