import { expect } from 'chai';
import OrganicProperty from '@sackrin/organic-property/lib/OrganicProperty';
import OrganicRoot from '@sackrin/organic-property/lib/OrganicRoot';
import OrganicPathValidator from '../OrganicPathValidator';

describe('Organic/OrganicPathValidator', () => {
  it('can return a failed result using a single validation rule', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const result = OrganicPathValidator({ required: 'value is required' })(
      exampleRoot,
      exampleProperty,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(false);
  });
});
