import OrganicConditionResult from '../Condition/Types/OrganicConditionResult';
import OrganicValidatorResult from '../Validation/Types/OrganicValidatorResult';
import OrganicLink from '@sackrin/organic-property/lib/Types/OrganicLink';

type OrganicHydrated = {
  links: void | OrganicLink;
  about: void | string[];
  attributes: void | { [k: string]: any };
  conditions: void | OrganicConditionResult;
  validation: void | OrganicValidatorResult;
};

export default OrganicHydrated;
