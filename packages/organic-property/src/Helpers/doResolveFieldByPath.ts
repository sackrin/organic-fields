import OrganicProperty from '../OrganicProperty';
import OrganicContainer from '../OrganicContainer';
import OrganicRoot from '../OrganicRoot';

type DoResolveFieldByPath = (
  origin: OrganicRoot<any, any> | OrganicProperty<any> | OrganicContainer<any>,
  path: string,
  discriminator?: (field: OrganicProperty<any>) => OrganicProperty<any> | void,
) => void | OrganicProperty<any>;

const doResolveFieldByPath: DoResolveFieldByPath = (origin, path, discriminator = (field) => field) => {
  // Split the path by /
  const chunks = path.split('/').filter(Boolean);
  // We will then loop through each of the pieces and traverse through the tree
  return chunks.reduce((curr, chunk) => {
    // If the current is undefined then we have not found what we are looking for
    if (!curr) return curr;
    // We will assume the following criteria
    // . = move the current to the parent of the origin
    if (chunk === '.' || chunk === '__parent__') {
      // If current does not have a parent then return
      if (!curr.parent()) return undefined;
      // Return the current parent
      return discriminator(curr.parent());
    } // .. = move the current to the parent of the parent
    else if (chunk === '..') {
      // If current does not have a parent then return
      if (!curr.parent()?.parent()) return undefined;
      // @TODO what if the parent has no parent?
      // @TODO we should probably return void
      return discriminator(curr.parent()?.parent());
    } // string = move the current to a child of the current
    else {
      // Current will be a parent
      const current = curr as OrganicContainer<any>;
      // If current does not have a parent then return
      if (!current.children) return undefined;
      // Loop through the parent's children and
      return discriminator(current.children.find((child) => child.machine === chunk));
    }
  }, origin);
};

export default doResolveFieldByPath;
