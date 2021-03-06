import OrganicCoreProperty from '@sackrin/organic-core/OrganicCoreProperty';
import OrganicCoreContainer from '@sackrin/organic-core/OrganicCoreContainer';
import OrganicContainer from '@sackrin/organic-container/OrganicContainer';

class OrganicChildren<V> extends Array {
  protected _parent: OrganicContainer<any>;

  constructor(parent: OrganicContainer<any>) {
    super();
    this._parent = parent;
  }

  // Override of the existing array push method
  public push(...items: any[]): number {
    // Loop through the provided items
    // Ensure that each new child has the correct parent
    super.push.apply(
      this,
      items.map((item) => item.parent(this._parent)),
    );
    // Return the new length of the array
    return this.length;
  }

  // Setting and getting the value of a collection of children
  // To populate children.value({ exampleField: 'exampleValue' });
  // To read children.value();
  public value(): V;
  public value(values: V): this;
  public value(...args) {
    // Deconstruct the possible value from the args
    const [values] = args;
    // If there is one arg we are setting the value for this property
    if (args.length > 0) {
      // Loop through each of the children
      // We need to loop through the children rather than the values
      // We do this so we can unset any that are not present in the value object
      this.forEach((child: OrganicCoreProperty<any>) => {
        // Retrieve the value from the passed values
        // If this is undefined this is okay, the value will be set to undefined
        const value = values[child.machine];
        // Update the child with the new value
        child.value(value);
      });
      // Return the instance for chaining
      return this;
    } // Otherwise we will be attempt to retrieve the list of values
    else {
      // Loop through the children and build up a new object with { machine: value }
      return this.reduce((curr, item) => ({ ...curr, [item.machine]: item.value() }), {});
    }
  }
}

export default OrganicChildren;
