import OrganicConditionResult from '../Condition/Types/OrganicConditionResult';
import OrganicValidatorResult from '../Validation/Types/OrganicValidatorResult';

type OrganicHydrated = {
  conditions: void | OrganicConditionResult;
  validation: void | OrganicValidatorResult;
};

export default OrganicHydrated;
