import OrganicValidatorResult from './Types/OrganicValidatorResult';
import OrganicProperty from '../OrganicProperty';
import OrganicValidator from './Types/OrganicValidator';
import OrganicRoot from '../OrganicRoot';
import OrganicFilter from '../Types/OrganicFilter';

type DoOrganicValidatorCheck = (
  root: OrganicRoot<any, any>,
  property: OrganicProperty<any>,
  validators: Array<{ validator: OrganicValidator; filter: void | OrganicFilter }>,
) => OrganicValidatorResult;

const OrganicValidatorsInitialResult: OrganicValidatorResult = {
  passed: true,
};

const doOrganicValidatorCheck: DoOrganicValidatorCheck = (root, property, validators) => {
  // Retrieve the previous result
  // This will help with validators that want to be previous result aware
  const previousResult = property.hydrated.validation;
  // Filter the list of validators
  // We want to ensure we are only applying the validators relevant for this context
  const applicable = validators
    .filter(({ validator, filter }) => {
      // If the filter is undefined then assume the validator is included
      // This will be the normal state for most validators
      if (!filter) return true;
      // If a filter is present then execute the filter and retrieve the result
      // We will include the validator if the result is true
      return filter(root, property);
    })
    // Loop through the validators which meet the requirements
    // We only want to use the validator so build an array of these
    .map(({ validator }) => validator);
  // Loop through each of the validators
  return applicable.reduce(
    (currentResult, validator) => validator(root, property, currentResult, previousResult),
    OrganicValidatorsInitialResult,
  );
};

export default doOrganicValidatorCheck;
