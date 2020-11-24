import OrganicRoot from '@sackrin/organic-property/lib/OrganicRoot';
import OrganicProperty from '@sackrin/organic-property/lib/OrganicProperty';
import OrganicFilter from '@sackrin/organic-property/lib/Types/OrganicFilter';

type DoOrganicAboutHydration = (
  root: OrganicRoot<any, any>,
  property: OrganicProperty<any>,
  abouts: Array<{ text: string | Function; filter: void | OrganicFilter }>,
) => string[];

const doOrganicAboutHydration: DoOrganicAboutHydration = (root, property, abouts) =>
  abouts
    .filter(({ text, filter }) => {
      // if no filter is provided then allow through
      if (!filter) return true;
      // Otherwise execute the filter and return based on the return
      return filter(root, property);
    })
    .map((about) => (typeof about.text === 'function' ? about.text(root, property) : about.text));

export default doOrganicAboutHydration;
