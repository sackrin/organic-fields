import OrganicValidator from '@sackrin/organic-property/Validation/Types/OrganicValidator';

type OrganicRulesValidatorCallback = (rules: string[]) => OrganicValidator;

const OrganicRulesValidator: OrganicRulesValidatorCallback = (rules) => (
  root,
  property,
  currentResult,
  previousResult,
) => {
  return { passed: false };
};

export default OrganicRulesValidator;
