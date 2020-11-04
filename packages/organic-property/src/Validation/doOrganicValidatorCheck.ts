import OrganicValidatorResult from './Types/OrganicValidatorResult';
import OrganicProperty from '../OrganicProperty';
import OrganicValidator from './Types/OrganicValidator';
import OrganicRoot from '../OrganicRoot';

type DoOrganicValidatorCheck = (
  root: OrganicRoot<any, any>,
  property: OrganicProperty<any>,
  validators: OrganicValidator[],
) => OrganicValidatorResult;

const OrganicValidatorsInitialResult: OrganicValidatorResult = {
  passed: true,
};

const doOrganicValidatorCheck: DoOrganicValidatorCheck = (root, property, validators) => {
  // Retrieve the previous result
  // This will help with validators that want to be previous result aware
  const previousResult = property.hydrated.validation;
  // Loop through each of the validators
  return validators.reduce(
    (currentResult, validator) => validator(root, property, currentResult, previousResult),
    OrganicValidatorsInitialResult,
  );
};

export default doOrganicValidatorCheck;
