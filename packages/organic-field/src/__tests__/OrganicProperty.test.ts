import { expect } from 'chai';
import OrganicProperty from '../OrganicProperty';

describe('Organic/OrganicProperty', () => {
  it('can create a simple organic property', () => {
    const exampleProperty = new OrganicProperty<void>('exampleProperty');
    expect(exampleProperty.machine).to.equal('exampleProperty');
    expect(exampleProperty.value()).to.be.undefined;
  });

  describe('Organic Property Values', () => {
    it('can provide a simple method for getting and setting the value', () => {
      const exampleProperty = new OrganicProperty<void | string>(
        'exampleProperty',
      );
      exampleProperty.value('John');
      expect(exampleProperty.value()).to.equal('John');
    });

    it('can allow the set value to be overwritten', () => {
      const exampleProperty = new OrganicProperty<void | string>(
        'exampleProperty',
      );
      exampleProperty.value('John');
      exampleProperty.value('Barry');
      expect(exampleProperty.value()).to.equal('Barry');
    });

    it('can allow for the value to be set to undefined', () => {
      const exampleProperty = new OrganicProperty<void | string>(
        'exampleProperty',
      );
      exampleProperty.value('John');
      exampleProperty.value(undefined);
      expect(exampleProperty.value()).to.be.undefined;
    });
  });

  describe('Organic Property Attributes', () => {
    it('can set a organic property attribute', () => {
      const exampleProperty = new OrganicProperty<void | string>(
        'exampleProperty',
      );
      exampleProperty.attribute<{ type: string }>('dog', { type: 'beagle' });
      expect(exampleProperty.attribute('dog')).to.deep.equal({
        type: 'beagle',
      });
    });

    it('can update a organic property attribute', () => {
      const exampleProperty = new OrganicProperty<void | string>(
        'exampleProperty',
      );
      exampleProperty.attribute<{ type: string }>('dog', { type: 'beagle' });
      exampleProperty.attribute<{ type: string }>('dog', { type: 'poodle' });
      expect(exampleProperty.attribute('dog')).to.deep.equal({
        type: 'poodle',
      });
    });

    it('can return a number of set organic property attributes', () => {
      const exampleProperty = new OrganicProperty<void | string>(
        'exampleProperty',
      );
      exampleProperty.attribute<{ type: string }>('dog', { type: 'beagle' });
      exampleProperty.attribute<{ type: string }>('cat', { type: 'tabby' });
      expect(exampleProperty.attributes).to.deep.equal({
        dog: { type: 'beagle' },
        cat: { type: 'tabby' },
      });
    });

    it('can throw an exception when attempting to fetch a attribute using an undefined property attribute key', () => {
      try {
        const exampleProperty = new OrganicProperty<void | string>(
          'exampleProperty',
        );
        exampleProperty.attribute<{ type: string }>(undefined);
        expect(true).to.equal(false);
      } catch (e) {
        expect(e.message).to.equal('invalid organic property arguments passed');
      }
    });
  });

  describe('Organic Property Condition', () => {
    it('can set a organic property condition check', () => {
      const exampleProperty = new OrganicProperty<void | string>(
        'exampleProperty',
      );
      const fakeCondition = () => ({ passed: true });
      exampleProperty.condition(fakeCondition);
      expect(exampleProperty.conditions.length).to.equal(1);
    });

    it('can set multiple organic property condition checks', () => {
      const exampleProperty = new OrganicProperty<void | string>(
        'exampleProperty',
      );
      const fakeConditionOne = (property) => ({ passed: true });
      const fakeConditionTwo = (property) => ({ passed: true });
      exampleProperty.condition(fakeConditionOne, fakeConditionTwo);
      expect(exampleProperty.conditions.length).to.equal(2);
    });

    it('can determine an organic property as present after passing a single condition check', () => {
      const exampleProperty = new OrganicProperty<void | string>(
        'exampleProperty',
      );
      const fakeCondition = () => ({ passed: true });
      exampleProperty.condition(fakeCondition);
      exampleProperty.hydrate('', {});
      expect(exampleProperty.conditions.length).to.equal(1);
    });
  });
});
