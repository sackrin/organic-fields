import OrganicConditionResult from '../Types/OrganicConditionResult';
import OrganicProperty from '../OrganicProperty';

type DoOrganicConditionsCheck = (
  property: OrganicProperty<any>,
) => OrganicConditionResult;

const doOrganicConditionsCheck: DoOrganicConditionsCheck = (property) => {
  return { passed: true };
};

export default doOrganicConditionsCheck;
