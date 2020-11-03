import OrganicProperty from '../OrganicProperty';
import OrganicConditionResult from './OrganicConditionResult';
import OrganicRoot from '@sackrin/organic-root/OrganicRoot';

type OrganicCondition = (
  root: OrganicRoot<any, any>,
  property: OrganicProperty<any>,
  currentResult: OrganicConditionResult,
  previousResult: void | OrganicConditionResult,
) => OrganicConditionResult;

export default OrganicCondition;
