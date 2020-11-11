import OrganicConditionResult from './OrganicConditionResult';
import OrganicValidatorResult from './OrganicValidatorResult';

type OrganicHydrated = {
  conditions: void | OrganicConditionResult;
  validators: void | OrganicValidatorResult;
};

export default OrganicHydrated;
