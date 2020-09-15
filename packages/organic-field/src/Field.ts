import Children from "./Children";
import NOTHING from "./Consts/NOTHING";

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
  let _children = Children(NOTHING, []);
  // Setting and getting the value of a field
  // To populate field.value('a value');
  // To read field.value();
  const value = (...args: [V] | []) => {
    // @TODO when children are added the value should be retrieved from the child
    // @TODO when events are implemented the get and set events should be triggered here
    if (args.length > 0) {
      _value = args[0];
      return _value;
    } else {
      return _value;
    }
  };
  // Setting and getting attributes of a field
  // Attributes are simple key/value meta data to add non field value data
  // To populate field.attribute('key', 'value);
  // To read field.attribute('key');
  const attribute = <D>(...args: [string, D] | [string]) => {
    const [key, value] = args;
    if (args.length === 1) {
      return _attributes[key];
    } else {
      _attributes[key] = value as D | void;
      return _attributes[key];
    }
  };

  const children = () => {};

  return {
    machine,
    context,
    value,
    attribute,
    attributes: _attributes,
    children
  };
};

export default Field;
