import OrganicValidator from '@sackrin/organic-property/lib/Validation/Types/OrganicValidator';
import Validator from 'validatorjs';

type OrganicRulesValidatorCallback = (rules: { [k: string]: void | string }) => OrganicValidator;

const OrganicRulesValidator: OrganicRulesValidatorCallback = (rules) => (
  root,
  property,
  currentResult,
  previousResult,
) => {
  // Retrieve the current property machine code
  const machine = property.machine;
  // Retrieve the current property value
  const value = property.value();
  // Construct the validator rules
  const combined = Object.keys(rules)
    .map((rule) => rule)
    .join('|');
  // Construct the list of messages
  const _messages = Object.entries(rules).reduce(
    (curr, [rule, message]) => (message ? { ...curr, [rule]: message } : curr),
    {},
  );
  // Construct the validator input object
  // See the validatorjs documentation
  const _input = { [machine]: value };
  const _rules = { [machine]: combined };
  // Construct the new validatorjs object
  const validator = new Validator(_input, _rules, _messages);
  // Determine if the validation passes
  // This will also execute the validation logic
  const passed = validator.passes() as boolean;
  // Return the validation result
  return {
    passed,
    messages: {
      error: validator.errors.get(machine),
    },
  };
};

export default OrganicRulesValidator;
