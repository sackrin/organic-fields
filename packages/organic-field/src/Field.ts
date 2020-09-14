type OrganicField<V> = {
  machine: string;
  context: string;
  value: (...args: [V] | []) => V;
  attributes: { [k: string]: any };
  attribute: <D>(...args: [string, D] | [string]) => D | void;
};

type OrganicFieldCreator = <V>(
  machine: string,
  context: string,
) => OrganicField<V>;

const Field: OrganicFieldCreator = <V>(machine, context) => {
  let _attributes = {};
  let _value = undefined;
  // turning the value of a field
  // To populate field.value('a value')
  // To read field.value()
  const value = (...args: [V] | []) => {
    if (args.length > 0) {
      _value = args[0];
      return _value;
    } else {
      return _value;
    }
  };
  const attribute = <D>(...args: [string, D] | [string]) => {
    const [key, value] = args;
    if (args.length === 1) {
      return _attributes[key];
    } else {
      _attributes[key] = value as D | void;
      return _attributes[key];
    }
  };
  return {
    machine,
    context,
    value,
    attribute,
    attributes: _attributes,
  };
};

export default Field;
