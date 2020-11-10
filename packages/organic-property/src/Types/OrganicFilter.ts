import OrganicRoot from '../OrganicRoot';
import OrganicProperty from '../OrganicProperty';

type OrganicFilter = (root: OrganicRoot<any, any>, property: OrganicProperty<any>) => boolean;

export default OrganicFilter;
