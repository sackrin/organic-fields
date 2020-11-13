import { expect } from 'chai';
import OrganicProperty from '@sackrin/organic-property/lib/OrganicProperty';
import OrganicRoot from '@sackrin/organic-property/lib/OrganicRoot';
import OrganicPathValidator from '../OrganicPathValidator';

describe('Organic/OrganicPathValidator', () => {
  it('can return a failed result using a relative path and === operator', () => {
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    exampleRoot.child(examplePropertyOne);
    exampleRoot.child(examplePropertyTwo);
    examplePropertyOne.value('John');
    examplePropertyTwo.value('Ryan');
    const result = OrganicPathValidator('./examplePropertyTwo', '===', 'John')(
      exampleRoot,
      examplePropertyOne,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(false);
  });

  it('can return a successful result using a relative path and === operator', () => {
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    exampleRoot.child(examplePropertyOne);
    exampleRoot.child(examplePropertyTwo);
    examplePropertyOne.value('John');
    examplePropertyTwo.value('Ryan');
    const result = OrganicPathValidator('./examplePropertyTwo', '===', 'Ryan')(
      exampleRoot,
      examplePropertyOne,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(true);
  });

  it('can return a failed result using a relative path and !== operator', () => {
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    exampleRoot.child(examplePropertyOne);
    exampleRoot.child(examplePropertyTwo);
    examplePropertyOne.value('John');
    examplePropertyTwo.value('Ryan');
    const result = OrganicPathValidator('./examplePropertyTwo', '!==', 'Ryan')(
      exampleRoot,
      examplePropertyOne,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(false);
  });

  it('can return a successful result using a relative path and !== operator', () => {
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
    exampleRoot.child(examplePropertyOne);
    exampleRoot.child(examplePropertyTwo);
    examplePropertyOne.value('John');
    examplePropertyTwo.value('Ryan');
    const result = OrganicPathValidator('./examplePropertyTwo', '!==', 'John')(
      exampleRoot,
      examplePropertyOne,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(true);
  });

  it('can return a failed result using a relative path and >= operator', () => {
    const examplePropertyOne = new OrganicProperty<void | number>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | number>('examplePropertyTwo');
    const exampleRoot = new OrganicRoot<{ examplePropertyOne: void | number; examplePropertyTwo: void | number }, {}>();
    exampleRoot.child(examplePropertyOne);
    exampleRoot.child(examplePropertyTwo);
    examplePropertyOne.value(25);
    examplePropertyTwo.value(55);
    const result = OrganicPathValidator('./examplePropertyTwo', '>=', 45)(
      exampleRoot,
      examplePropertyOne,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(false);
  });

  it('can return a successful result using a relative path and >= operator', () => {
    const examplePropertyOne = new OrganicProperty<void | number>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | number>('examplePropertyTwo');
    const exampleRoot = new OrganicRoot<{ examplePropertyOne: void | number; examplePropertyTwo: void | number }, {}>();
    exampleRoot.child(examplePropertyOne);
    exampleRoot.child(examplePropertyTwo);
    examplePropertyOne.value(25);
    examplePropertyTwo.value(55);
    const result = OrganicPathValidator('./examplePropertyTwo', '>=', 55)(
      exampleRoot,
      examplePropertyOne,
      { passed: true },
      { passed: false },
    );
    expect(result.passed).to.equal(false);
  });
});
