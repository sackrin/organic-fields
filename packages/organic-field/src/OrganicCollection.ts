import OrganicProperty from './OrganicProperty';
import OrganicChildren from './OrganicChildren';

class OrganicCollection<V> extends OrganicProperty<V> {
  protected _children: OrganicChildren<V>;
  constructor(machine) {
    super(machine);
    this._children = new OrganicChildren<V>();
  }
  get children(): OrganicChildren<V> {
    return this._children;
  }

  // Adding a child property to the collection
  // To populate collection.child(property);
  public child<C>(field: OrganicProperty<C>): this;
  public child(field) {
    // Push the child into the list of children
    // @TODO should we do a unique pass to ensure the same child hasn't been entered twice?
    this._children.push(field);
    // Return the instance for chaining
    return this;
  }

  public value(): V;
  public value(val: V): this;
  public value(...args: [V] | []) {
    // Deconstruct the possible value from the args
    const [value] = args;
    // If there is one arg we are setting the value for this property
    if (args.length === 1) {
      // Return the instance for chaining
      return this;
    } else if (this._children.length > 0) {
      return this._children.value();
    }
  }
}

export default OrganicCollection;