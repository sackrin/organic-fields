import OrganicProperty from '../OrganicProperty';
import OrganicValidatorResult from './OrganicValidatorResult';
import OrganicRoot from '@sackrin/organic-root/OrganicRoot';

type OrganicValidator = (
  root: OrganicRoot<any, any>,
  property: OrganicProperty<any>,
  currentResult: OrganicValidatorResult,
  previousResult: void | OrganicValidatorResult,
) => OrganicValidatorResult;

export default OrganicValidator;
