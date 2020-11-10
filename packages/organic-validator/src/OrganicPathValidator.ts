import OrganicValidator from '@sackrin/organic-property/lib/Validation/Types/OrganicValidator';

type OrganicPathValidatorCallback = (rules: { [k: string]: void | string }) => OrganicValidator;

const OrganicPathValidator: OrganicPathValidatorCallback = (rules) => (
  root,
  property,
  currentResult,
  previousResult,
) => {
  // Return the validation result
  return {
    passed: false,
  };
};

export default OrganicPathValidator;
