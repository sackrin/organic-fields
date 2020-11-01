import OrganicProperty from '../OrganicProperty';

export type OrganicLinkOptions = { absolute?: boolean; twoWay?: boolean };

type OrganicLink = {
  name?: string;
  path: string;
  field: void | OrganicProperty<any>;
  options: OrganicLinkOptions;
};

export default OrganicLink;
