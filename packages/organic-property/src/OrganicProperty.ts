import OrganicCondition from './Types/OrganicCondition';
import OrganicHydrated from './Types/OrganicHydrated';
import doConditionsCheck from './Helpers/doConditionsCheck';
import doValidatorCheck from './Helpers/doValidatorCheck';
import OrganicRoot from './OrganicRoot';
import OrganicLink, { OrganicLinkOptions } from './Types/OrganicLink';
import doResolveFieldByPath from './Helpers/doResolveFieldByPath';
import OrganicValidator from './Types/OrganicValidator';

class OrganicProperty<V, A = { [k: string]: any }> {
  protected _root: OrganicRoot<any, any>;
  protected _machine: string;
  protected _value?: V;
  protected _attributes?: A;
  protected _conditions?: OrganicCondition[];
  protected _validators?: OrganicValidator[];
  protected _hydrated: OrganicHydrated;
  protected _parent: OrganicProperty<any>;
  protected _links: OrganicLink[];

  constructor(machine: string) {
    this._machine = machine;
    this._attributes = {} as A;
    this._conditions = [];
    this._validators = [];
    this._links = [];
    this._hydrated = {
      conditions: undefined,
      validators: undefined,
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

  get validators(): OrganicValidator[] {
    return this._validators;
  }

  get links(): OrganicLink[] {
    return this._links;
  }

  get hydrated(): OrganicHydrated {
    return this._hydrated;
  }

  public root(): OrganicRoot<any, any>;
  public root(root: OrganicRoot<any, any>): this;
  public root(...args: [OrganicRoot<any, any>] | []) {
    // Deconstruct the possible root from the args
    const [root] = args;
    // If there is one arg we are setting the parent for this property
    if (args.length === 1) {
      // Update the root of the property
      this._root = root;
      // Return the instance for chaining
      return this;
    } else {
      return this._root;
    }
  }

  public parent(): OrganicProperty<any>;
  public parent(parent: OrganicProperty<any>): this;
  public parent(...args: [OrganicProperty<any>] | []) {
    // Deconstruct the possible parent from the args
    const [parent] = args;
    // If there is one arg we are setting the parent for this property
    if (args.length === 1) {
      // Update the parent of the property
      this._parent = parent;
      // Return the instance for chaining
      return this;
    } else {
      return this._parent;
    }
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

  // Validation checks will result in a validation true or false result
  // A validator will be added for each time validator is called (they stack)
  // Fields which fail validator checks can be used to determine the validity of a field
  public validator(...validators: OrganicValidator[]): this;
  public validator(...validators) {
    // Merge the validator into the list of validators
    this._validators = [...this._validators, ...validators];
    // Return the instance for chaining
    return this;
  }

  // Linking to other fields
  // This is useful for hard coded
  // @param relative: if the link is relative to this field's position within the tree
  // @twoWay: if the linked field should also have a link established to this field
  public link(name: string, path: string, options?: OrganicLinkOptions): this;
  public link(name, path, options = {}) {
    // Add the link to this field's list of links
    // We will not be able to resolve the links until later
    // This is because the other fields we are linking may not have been added to the organic tree yet
    this._links.push({ name, path, field: undefined, options });
    // Return the instance for chaining
    return this;
  }

  // Resolve linked fields
  // This should only be done when the field tree has been built or changes have been made
  public resolve(): this;
  public resolve() {
    // Loop through the links we have
    this._links = this.links.map((link) => {
      // If the link already has a resolved field move on
      // @TODO should we allow to disable this
      if (link.field) return link;
      // Attempt to resolve the field
      const field = doResolveFieldByPath(link.options?.absolute === true ? this.root() : this, link.path);
      // If a field was resolved then update the link
      return { ...link, field };
    });
    // Return the instance for chaining
    return this;
  }

  public hydrate<R, P>(root: OrganicRoot<R, P>): this;
  public hydrate(root) {
    // Check if the value has changed since last hydration
    // Check if the peripherals have changed since last hydration
    // If neither the value or peripherals have changed then return the instance
    // We do this to prevent unnecessary hydration and updates
    // Update the current root
    this.root(root);
    // Resolve the property links
    this.resolve();
    // @TODO Perform a condition check
    this.hydrated.conditions = doConditionsCheck(root, this, this.conditions);
    // @TODO Perform a validation check
    this.hydrated.validators = doValidatorCheck(root, this, this.validators);
    // @TODO Perform any triggers
    // Return the instance for chaining
    return this;
  }
}

export default OrganicProperty;
