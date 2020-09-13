type OrganicField<V> = {
  machine: string;
  context: string;
  value: (...args: [V] | []) => V;
};

type OrganicFieldCreator = <V>(
  machine: string,
  context: string,
) => OrganicField<V>;

const Field: OrganicFieldCreator = <V>(machine, context) => {
  let _attributes = {};
  let _value = undefined;
  // Method for updating or returning the value of a field
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
  return {
    machine,
    context,
    value,
  };
};

export default Field;
