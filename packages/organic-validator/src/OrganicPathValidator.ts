import OrganicValidator from '@sackrin/organic-property/lib/Validation/Types/OrganicValidator';
import doResolveFieldByPath from '@sackrin/organic-property/lib/Helpers/doResolveFieldByPath';

function OrganicPathValidator(path: string, callback: Function): OrganicValidator;
function OrganicPathValidator(path: string, operator: string, value: any): OrganicValidator;
function OrganicPathValidator(...args: [string, Function] | [string, string, any]): OrganicValidator {
  // Return the validation result
  return (root, property, currentResult, previousResult) => {
    // Retrieve the relative path
    const path = args[0];
    // Attempt to retrieve the relative property
    const relativeProperty = doResolveFieldByPath(property, path);
    // If we did not find the relative property then return false
    if (!relativeProperty) return { passed: false };
    // If we are testing using an operator and a value
    if (args.length === 3) {
      // If we are looking for an exact match
      if (args[1] === '===' && relativeProperty.value() !== args[2]) return { passed: false };
      // If we are looking for a not match
      else if (args[1] === '!==' && relativeProperty.value() === args[2]) return { passed: false };
      // If we are looking for a not match
      else if (args[1] === '>=' && relativeProperty.value() >= args[2]) return { passed: false };
      // Otherwise return the current result
      return currentResult;
    }

    return currentResult;
  };
}

export default OrganicPathValidator;
