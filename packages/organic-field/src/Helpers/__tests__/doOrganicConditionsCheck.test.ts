import { expect } from 'chai';
import doOrganicConditionsCheck from '../doOrganicConditionsCheck';
import OrganicProperty from '../../OrganicProperty';
import OrganicRoot from '../../OrganicRoot';

describe('Organic/Helpers/doOrganicConditionsCheck', () => {
  it('can provide a passing result for a single simple condition check', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }>();
    const fakeCondition = () => ({ passed: true });
    const result = doOrganicConditionsCheck(exampleRoot, exampleProperty, [fakeCondition]);
    expect(result.passed).to.equal(true);
  });

  it('can provide a failing result for a single simple condition check', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }>();
    const fakeCondition = () => ({ passed: false });
    const result = doOrganicConditionsCheck(exampleRoot, exampleProperty, [fakeCondition]);
    expect(result.passed).to.equal(false);
  });
});