import { expect } from 'chai';
import OrganicChildren from '../OrganicChildren';
import OrganicProperty from '../OrganicProperty';

describe('Organic/OrganicChildren', () => {
  it('can have a child added to the children', () => {
    const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
    const exampleChildren = new OrganicChildren<{ exampleProperty: string }>();
    exampleChildren.push(exampleProperty);
    expect(exampleChildren.length).to.equal(1);
  });

  it('can add/update values for all children', () => {
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleChildren = new OrganicChildren<{
      examplePropertyOne: void | string;
      examplePropertyTwo: void | string;
    }>();
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
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleChildren = new OrganicChildren<{
      examplePropertyOne: void | string;
      examplePropertyTwo?: void | string;
    }>();
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
    const examplePropertyOne = new OrganicProperty<void | string>('examplePropertyOne');
    const examplePropertyTwo = new OrganicProperty<void | string>('examplePropertyTwo');
    const exampleChildren = new OrganicChildren<{
      examplePropertyOne: void | string;
      examplePropertyTwo: void | string;
    }>();
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
