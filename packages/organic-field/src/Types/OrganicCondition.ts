import OrganicProperty from '../OrganicProperty';
import OrganicConditionResult from './OrganicConditionResult';
import OrganicRoot from '../OrganicRoot';

type OrganicCondition = (
  root: OrganicRoot<any>,
  property: OrganicProperty<any>,
  currentResult: OrganicConditionResult,
  previousResult: void | OrganicConditionResult,
) => OrganicConditionResult;

export default OrganicCondition;
