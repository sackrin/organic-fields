import OrganicRoot from '@sackrin/organic-property/lib/OrganicRoot';
import OrganicProperty from '@sackrin/organic-property/lib/OrganicProperty';
import OrganicFilter from '@sackrin/organic-property/lib/Types/OrganicFilter';

type DoOrganicAttributesHydration = (
  root: OrganicRoot<any, any>,
  property: OrganicProperty<any>,
  attributes: Array<{ attribute: string; value: string | Function; filter: void | OrganicFilter }>,
) => { [k: string]: any };

const doOrganicAttributesHydration: DoOrganicAttributesHydration = (root, property, attributes) => {
  // First generate an object of non filtered attributes
  // These will provide the defaults as we can assume the conditional attributes > static attributes
  const _attributes = attributes.reduce((curr, { attribute, value, filter }) => {
    // If a filter exists then return the current attributes
    if (filter) return curr;
    // Return the newly added attribute to the object
    return { ...curr, [attribute]: typeof value === 'function' ? value(root, property) : value };
  }, []);
  // Return the attributes which have filters and resolve
  return attributes.reduce((curr, { attribute, value, filter }) => {
    // if no filter then continue
    if (!filter) return curr;
    // If the filter does not resolve then continue
    if (!filter(root, property)) return curr;
    // Return the newly added attribute to the object
    return { ...curr, [attribute]: typeof value === 'function' ? value(root, property) : value };
  }, _attributes);
};

export default doOrganicAttributesHydration;
