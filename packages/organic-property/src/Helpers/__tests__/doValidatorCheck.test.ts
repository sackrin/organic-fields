import { expect } from 'chai';
import doValidatorCheck from '../doValidatorCheck';
import OrganicProperty from '../../OrganicProperty';
import OrganicRoot from '../../OrganicRoot';

describe('Organic/Helpers/doValidatorCheck', () => {
  it('can provide a passing result for a single simple validator check', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const fakeValidator = () => ({ passed: true });
    const result = doValidatorCheck(exampleRoot, exampleProperty, [fakeValidator]);
    expect(result.passed).to.equal(true);
  });

  it('can provide a failing result for a single simple validator check', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const fakeValidator = () => ({ passed: false });
    const result = doValidatorCheck(exampleRoot, exampleProperty, [fakeValidator]);
    expect(result.passed).to.equal(false);
  });
});
