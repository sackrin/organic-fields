import OrganicRoot from '@sackrin/organic-root/OrganicRoot';
import OrganicChildren from '@sackrin/organic-children/OrganicChildren';
import OrganicCoreProperty from './OrganicCoreProperty';

class OrganicCoreContainer<V> extends OrganicCoreProperty<V> {
  protected _children: OrganicChildren<V>;

  constructor(machine) {
    super(machine);
    this._children = new OrganicChildren<V>(this);
    // @TODO inject a children validator check
    // this.validator(checkChildResultValidator);
  }

  get children(): OrganicChildren<V> {
    return this._children;
  }

  // Adding a child property to the collection
  // To populate collection.child(property);
  public child<C>(field: OrganicCoreProperty<C>): this;
  public child(field) {
    // Push the child into the list of children
    // @TODO should we do a unique pass to ensure the same child hasn't been entered twice?
    this._children.push(field);
    // Return the instance for chaining
    return this;
  }

  // Setting and getting the values of a field
  // Collections take object literals as a value
  // To populate field.value({ exampleFieldOne: 'value', exampleFieldTwo: 'value' });
  // To read field.value();
  public value(): V;
  public value(val: V): this;
  public value(...args: [V] | []) {
    // Deconstruct the possible value from the args
    const [value] = args;
    // If there is one arg we are setting the value for this property
    if (args.length === 1) {
      // Loop through each of the children and assign their value
      // @TODO do a deep check with previous values
      // @TODO provide a way to configure a field to use either deep or shallow checking of objects
      // We do this to avoid doing expensive updates further downstream
      this._children.value(value);
      // Return the instance for chaining
      return this;
    } else if (this._children.length > 0) {
      return this._children.value();
    }
  }

  public hydrate<R, P>(root: OrganicRoot<R, P>): this;
  public hydrate(root) {
    // Loop through each field and hydrate
    this._children.forEach((child) => child.hydrate(root));
    // Update the current root
    super.hydrate(root);
    // Return the instance for chaining
    return this;
  }
}

export default OrganicCoreContainer;
