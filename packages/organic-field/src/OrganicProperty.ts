import OrganicCondition from './Types/OrganicCondition';
import OrganicHydrated from './Types/OrganicHydrated';
import doOrganicConditionsCheck from './Helpers/doOrganicConditionsCheck';
import OrganicRoot from './OrganicRoot';

class OrganicProperty<V, A = { [k: string]: any }> {
  protected _machine: string;
  protected _value?: V;
  protected _attributes?: A;
  protected _conditions?: OrganicCondition[];
  protected _hydrated: OrganicHydrated;

  constructor(machine: string) {
    this._machine = machine;
    this._attributes = {} as A;
    this._conditions = [];
    this._hydrated = {
      conditions: undefined,
    };
  }

  get machine(): string {
    return this._machine;
  }

  get attributes(): A {
    return this._attributes;
  }

  get conditions(): OrganicCondition[] {
    return this._conditions;
  }

  get hydrated(): OrganicHydrated {
    return this._hydrated;
  }

  // Setting and getting the value of a field
  // To populate field.value('a value');
  // To read field.value();
  public value(): V;
  public value(val: V): this;
  public value(...args: [V] | []) {
    // Deconstruct the possible value from the args
    const [value] = args;
    // If there is one arg we are setting the value for this property
    if (args.length === 1) {
      // Update the value of the property
      // @TODO Apply middlewares to allow sanitisation
      this._value = value;
      // Return the instance for chaining
      return this;
    } // Otherwise we are just trying to retrieve the value
    else {
      // @TODO Apply middleware to allow transformation
      return this._value;
    }
  }

  // Setting and getting attributes oOrganicRootf a field
  // Attributes are simple key/value meta data to add non field value data
  // To populate field.attribute('key', 'value);
  // To read field.attribute('key');
  public attribute<I>(name): I;
  public attribute<I>(name, value: I): this;
  public attribute<I>(...args: [string, I] | [string]) {
    // Deconstruct the possible attribute key and value from the args
    const [key, value] = args;
    // Do a quick sanity check
    // We need at least one argument in order for this method to work correctly
    if (!key) throw new Error('invalid organic property arguments passed');
    // If we are only passing one arg we are attempt to fetch an arg value
    if (args.length === 1) {
      // Return the fetched arg
      return this._attributes[key] as I | void;
    } // Otherwise
    else {
      // Update the value of the attribute
      this._attributes[key] = value as I | void;
      // Return the instance for chaining
      return this;
    }
  }

  // Conditional checks will result in a visible true or false result
  // A condition will be added for each time condition is called (they stack)
  // Fields which fail conditional checks can be used to control frontend UI or strip out values for API requests
  public condition(...checks: OrganicCondition[]): this;
  public condition(...checks) {
    // Merge the conditions into the list of conditions
    this._conditions = [...this._conditions, ...checks];
    // Return the instance for chaining
    return this;
  }

  public hydrate(root: OrganicRoot<any>, value: V, peripheral?: { [k: string]: any }): this;
  public hydrate(root, value, peripheral = {}) {
    // Check if the value has changed since last hydration
    // Check if the peripherals have changed since last hydration
    // If neither the value or peripherals have changed then return the instance
    // We do this to prevent unnecessary hydration and updates
    // Update the value with the passed value
    this.value(value);
    // @TODO Perform a condition check
    this._hydrated.conditions = doOrganicConditionsCheck(root, this, this.conditions);
    // @TODO Perform a validation check
    // @TODO Perform any triggers
    // Return the instance for chaining
    return this;
  }
}

export default OrganicProperty;
