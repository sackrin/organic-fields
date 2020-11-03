import OrganicConditionResult from '../Types/OrganicConditionResult';
import OrganicProperty from '../OrganicProperty';
import OrganicCondition from '../Types/OrganicCondition';
import OrganicRoot from '@sackrin/organic-root/OrganicRoot';

type DoConditionsCheck = (
  root: OrganicRoot<any, any>,
  property: OrganicProperty<any>,
  conditions: OrganicCondition[],
) => OrganicConditionResult;

const OrganicConditionsInitialResult: OrganicConditionResult = {
  passed: true,
};

const doConditionsCheck: DoConditionsCheck = (root, property, conditions) => {
  // Retrieve the previous result
  // This will help with conditions that want to be previous result aware
  const previousResult = property.hydrated.conditions;
  // Loop through each of the conditions
  return conditions.reduce(
    (currentResult, condition) => condition(root, property, currentResult, previousResult),
    OrganicConditionsInitialResult,
  );
};

export default doConditionsCheck;
