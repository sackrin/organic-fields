import OrganicConditionResult from './Types/OrganicConditionResult';
import OrganicProperty from '../OrganicProperty';
import OrganicCondition from './Types/OrganicCondition';
import OrganicRoot from '../OrganicRoot';
import OrganicFilter from '../Types/OrganicFilter';

type DoOrganicConditionsCheck = (
  root: OrganicRoot<any, any>,
  property: OrganicProperty<any>,
  conditions: Array<{ condition: OrganicCondition; filter: void | OrganicFilter }>,
) => OrganicConditionResult;

const OrganicConditionsInitialResult: OrganicConditionResult = {
  passed: true,
};

const doOrganicConditionsCheck: DoOrganicConditionsCheck = (root, property, conditions) => {
  // Retrieve the previous result
  // This will help with conditions that want to be previous result aware
  const previousResult = property.hydrated.conditions;
  // Filter the list of conditions
  // We want to ensure we are only applying the conditions relevant for this context
  const applicable = conditions
    .filter(({ condition, filter }) => {
      // If the filter is undefined then assume the condition is included
      // This will be the normal state for most conditions
      if (!filter) return true;
      // If a filter is present then execute the filter and retrieve the result
      // We will include the condition if the result is true
      return filter(root, property);
    })
    // Loop through the conditions which meet the requirements
    // We only want to use the condition so build an array of these
    .map(({ condition }) => condition);
  // Loop through each of the conditions
  return applicable.reduce(
    (currentResult, condition) => condition(root, property, currentResult, previousResult),
    OrganicConditionsInitialResult,
  );
};

export default doOrganicConditionsCheck;
