import { expect } from 'chai';
import doOrganicValidatorCheck from '../doOrganicValidatorCheck';
import OrganicProperty from '../../OrganicProperty';
import OrganicRoot from '../../OrganicRoot';

describe('Organic/Helpers/doOrganicValidatorCheck', () => {
  it('can provide a passing result for a single simple validator check', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const fakeValidator = () => ({ passed: true });
    const result = doOrganicValidatorCheck(exampleRoot, exampleProperty, [
      { validator: fakeValidator, filter: undefined },
    ]);
    expect(result.passed).to.equal(true);
  });

  it('can provide a failing result for a single simple validator check', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const fakeValidator = () => ({ passed: false });
    const result = doOrganicValidatorCheck(exampleRoot, exampleProperty, [
      { validator: fakeValidator, filter: undefined },
    ]);
    expect(result.passed).to.equal(false);
  });
});
