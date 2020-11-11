import { expect } from 'chai';
import OrganicChildren from '../OrganicChildren';
import OrganicProperty from '@sackrin/organic-property/OrganicProperty';
import OrganicContainer from '@sackrin/organic-container/OrganicContainer';

describe('Organic/OrganicChildren', () => {
  it('can have a child added to the children', () => {
    const exampleParent = new OrganicContainer<{ exampleProperty: string }>('exampleProperty');
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleChildren = new OrganicChildren<{ exampleProperty: string }>(exampleParent);
    exampleChildren.push(exampleProperty);
    expect(exampleChildren.length).to.equal(1);
  });

  it('can add/update values for all children', () => {
    const exampleParent = new OrganicContainer<{ examplePropertyOne: string; examplePropertyTwo: string }>(
      'exampleProperty',
    );
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleChildren = new OrganicChildren<{
      examplePropertyOne: void | string;
      examplePropertyTwo: void | string;
    }>(exampleParent);
    exampleChildren.push(examplePropertyOne);
    exampleChildren.push(examplePropertyTwo);
    exampleChildren.value({
      examplePropertyOne: 'example a',
      examplePropertyTwo: 'example b',
    });
    expect(examplePropertyOne.value()).to.equal('example a');
    expect(examplePropertyTwo.value()).to.equal('example b');
    expect(exampleChildren.value()).to.deep.equal({
      examplePropertyOne: 'example a',
      examplePropertyTwo: 'example b',
    });
  });

  it('can add/update values for some of the children', () => {
    const exampleParent = new OrganicContainer<{ examplePropertyOne: string; examplePropertyTwo: string }>(
      'exampleProperty',
    );
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleChildren = new OrganicChildren<{
      examplePropertyOne: void | string;
      examplePropertyTwo?: void | string;
    }>(exampleParent);
    exampleChildren.push(examplePropertyOne);
    exampleChildren.push(examplePropertyTwo);
    exampleChildren.value({
      examplePropertyOne: 'example a',
    });
    expect(examplePropertyOne.value()).to.equal('example a');
    expect(examplePropertyTwo.value()).to.equal(undefined);
    expect(exampleChildren.value()).to.deep.equal({
      examplePropertyOne: 'example a',
      examplePropertyTwo: undefined,
    });
  });

  it('can retrieve the correct values for fields updated outside of the children values method', () => {
    const exampleParent = new OrganicContainer<{ examplePropertyOne: string; examplePropertyTwo: string }>(
      'exampleProperty',
    );
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleChildren = new OrganicChildren<{
      examplePropertyOne: void | string;
      examplePropertyTwo: void | string;
    }>(exampleParent);
    exampleChildren.push(examplePropertyOne);
    exampleChildren.push(examplePropertyTwo);
    exampleChildren.value({
      examplePropertyOne: 'example a',
      examplePropertyTwo: 'example b',
    });
    examplePropertyTwo.value('example c');
    expect(exampleChildren.value()).to.deep.equal({
      examplePropertyOne: 'example a',
      examplePropertyTwo: 'example c',
    });
  });
});
