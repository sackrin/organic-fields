import OrganicProperty from '../OrganicProperty';
import OrganicConditionResult from './OrganicConditionResult';

type OrganicCondition = (
  property: OrganicProperty<any>,
) => OrganicConditionResult;

export default OrganicCondition;
