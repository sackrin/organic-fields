import OrganicProperty from '@src/OrganicProperty';
import OrganicChildren from '@src/OrganicChildren';

class OrganicCollection<V> extends OrganicProperty<V> {
  private _children: OrganicChildren<V> = new OrganicChildren<V>();
  constructor(machine) {
    super(machine);
  }
  get children(): OrganicChildren<V> {
    return this._children;
  }

  public child<C>(field: OrganicProperty<C>): this {
    this._children.push(field);
    return this;
  }

  public value(): V;
  public value(val: V): this;
  public value(val?: V) {
    if (val) {
      this._value = val;
      return this;
    } else if (this._children.length > 0) {
      return this._children.value();
    }
  }
}

export default OrganicCollection;
