import OrganicProperty from '../OrganicProperty';

export type OrganicLinkOptions = { relative?: boolean; twoWay?: boolean };

type OrganicLink = {
  path: string;
  field: void | OrganicProperty<any>;
  options: OrganicLinkOptions;
};

export default OrganicLink;
