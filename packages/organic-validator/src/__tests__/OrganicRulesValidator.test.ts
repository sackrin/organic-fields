import { expect } from 'chai';
import OrganicProperty from '@sackrin/organic-property/lib/OrganicProperty';
import OrganicRoot from '@sackrin/organic-property/lib/OrganicRoot';
import OrganicRulesValidator from '../OrganicRulesValidator';

describe('Organic/OrganicRulesValidator', () => {
  it('can return a passing result using a single validation rule', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty').value('Test');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const result = OrganicRulesValidator({ required: 'value is required' })(
      exampleRoot,
      exampleProperty,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(true);
  });

  it('can return a failed result using a single validation rule', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const result = OrganicRulesValidator({ required: 'value is required' })(
      exampleRoot,
      exampleProperty,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(false);
  });

  it('can return a failed result using a single validation rule and custom error message', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const result = OrganicRulesValidator({ required: 'value is required' })(
      exampleRoot,
      exampleProperty,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(false);
    expect(result.messages.error).to.deep.equal(['value is required']);
  });

  it('can return a passing result using multiple validation rules', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty').value('Test');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const result = OrganicRulesValidator({
      required: 'value is required',
      'size:4': 'You need to enter 4 characters',
    })(exampleRoot, exampleProperty, { passed: true }, { passed: false });
    expect(result.passed).to.equal(true);
  });

  it('can return a failing result using multiple validation rules', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty').value('Hi');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    const result = OrganicRulesValidator({
      required: 'value is required',
      'size:4': 'You need to enter 4 characters',
    })(exampleRoot, exampleProperty, { passed: true }, { passed: false });
    expect(result.passed).to.equal(false);
    expect(result.messages.error).to.deep.equal(['You need to enter 4 characters']);
  });
});
