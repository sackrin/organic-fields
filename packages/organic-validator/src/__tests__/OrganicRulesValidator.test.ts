import { expect } from 'chai';
import OrganicProperty from '@sackrin/organic-property/OrganicProperty';
import OrganicRoot from '@sackrin/organic-property/OrganicRoot';
import OrganicRulesValidator from '../OrganicRulesValidator';

describe('Organic/OrganicRulesValidator', () => {
  it('can return a failed result using a single validation rule', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const result = OrganicRulesValidator(['required'])(
      exampleRoot,
      exampleProperty,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(false);
  });
});
