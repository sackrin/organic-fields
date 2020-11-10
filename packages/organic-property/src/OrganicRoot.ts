import OrganicContainer from './OrganicContainer';

class OrganicRoot<V, P> extends OrganicContainer<V> {
  protected _peripheral: P;
  protected _contextual: { [k: string]: any };

  constructor() {
    super('root');
    this.root(this);
  }

  // Setting and getting the contextual data
  // Contextual data is intended to be used to provide data for filtering etc
  // To populate field.contextual({});
  // To read field.contextual();
  public contextual<C>(): C;
  public contextual<C>(val: C): this;
  public contextual<C>(...args: [C] | []) {
    // Deconstruct the possible value from the args
    const [contextual] = args;
    // If there is one arg we are setting the value for this property
    if (args.length === 1) {
      // Update the value of the property
      this._contextual = contextual;
      // Return the instance for chaining
      return this;
    } // Otherwise we are just trying to retrieve the value
    else {
      return this._contextual;
    }
  }

  // Setting and getting the peripheral data
  // To populate field.peripherals({});
  // To read field.peripherals();
  public peripherals(): P;
  public peripherals(val: P): this;
  public peripherals(...args: [P] | []) {
    // Deconstruct the possible value from the args
    const [peripheral] = args;
    // If there is one arg we are setting the value for this property
    if (args.length === 1) {
      // Update the value of the property
      this._peripheral = peripheral;
      // Return the instance for chaining
      return this;
    } // Otherwise we are just trying to retrieve the value
    else {
      return this._peripheral;
    }
  }

  public hydrate<V, P>(): this;
  public hydrate() {
    // Pass this object as the root
    return super.hydrate<V, P>(this);
  }
}

export default OrganicRoot;
