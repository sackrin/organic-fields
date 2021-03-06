import { expect } from 'chai';
import OrganicProperty from '../OrganicProperty';
import OrganicRoot from '@sackrin/organic-root/OrganicRoot';
import OrganicContainer from '@sackrin/organic-container/OrganicContainer';

describe('Organic/OrganicProperty', () => {
  it('can create a simple organic property', () => {
    const exampleProperty = new OrganicProperty<void>('exampleProperty');
    expect(exampleProperty.machine).to.equal('exampleProperty');
    expect(exampleProperty.value()).to.be.undefined;
  });

  describe('Organic Property Values', () => {
    it('can provide a simple method for getting and setting the value', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      exampleProperty.value('John');
      expect(exampleProperty.value()).to.equal('John');
    });

    it('can allow the set value to be overwritten', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      exampleProperty.value('John');
      exampleProperty.value('Barry');
      expect(exampleProperty.value()).to.equal('Barry');
    });

    it('can allow for the value to be set to undefined', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      exampleProperty.value('John');
      exampleProperty.value(undefined);
      expect(exampleProperty.value()).to.be.undefined;
    });
  });

  describe('Organic Property Attributes', () => {
    it('can set a organic property attribute', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      exampleProperty.attribute<{ type: string }>('dog', { type: 'beagle' });
      expect(exampleProperty.attribute('dog')).to.deep.equal({
        type: 'beagle',
      });
    });

    it('can update a organic property attribute', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      exampleProperty.attribute<{ type: string }>('dog', { type: 'beagle' });
      exampleProperty.attribute<{ type: string }>('dog', { type: 'poodle' });
      expect(exampleProperty.attribute('dog')).to.deep.equal({
        type: 'poodle',
      });
    });

    it('can return a number of set organic property attributes', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      exampleProperty.attribute<{ type: string }>('dog', { type: 'beagle' });
      exampleProperty.attribute<{ type: string }>('cat', { type: 'tabby' });
      expect(exampleProperty.attributes).to.deep.equal({
        dog: { type: 'beagle' },
        cat: { type: 'tabby' },
      });
    });

    it('can throw an exception when attempting to fetch a attribute using an undefined property attribute key', () => {
      try {
        const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
        exampleProperty.attribute<{ type: string }>(undefined);
        expect(true).to.equal(false);
      } catch (e) {
        expect(e.message).to.equal('invalid organic property arguments passed');
      }
    });
  });

  describe('Organic Property Parent', () => {
    it('can have a parent when part of container', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
      exampleRoot.child(exampleProperty);
      expect(exampleProperty.parent()).to.equal(exampleRoot);
    });
  });

  describe('Organic Property Linking', () => {
    type ExampleTree = {
      uuid: string;
      person: {
        firstName: void | string;
        surname: void | string;
      };
    };

    it('can link the field to the parent', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
      exampleRoot.child(exampleProperty.link('parent', '__parent__'));
      exampleRoot.peripherals({}).hydrate();
      expect(exampleProperty.links.find((link) => link.path === '__parent__').field).to.equal(exampleRoot);
    });

    it('can link the field to a field relative to itself', () => {
      const exampleTree = new OrganicRoot<{ exampleProperty: void | string }, {}>()
        .child(new OrganicProperty<string>('uuid'))
        .child(
          new OrganicContainer<ExampleTree>('personal')
            .child(new OrganicProperty<void | string>('firstName').link('surname', './surname'))
            .child(new OrganicProperty<void | string>('surname')),
        );
      exampleTree.peripherals({}).hydrate();
      const firstName = exampleTree.children[1].children[0];
      const surname = exampleTree.children[1].children[1];
      expect(firstName.links.find((link) => link.path === './surname').field).to.equal(surname);
    });

    it('can link the field to a field absolute from the root', () => {
      const exampleTree = new OrganicRoot<{ exampleProperty: void | string }, {}>()
        .child(new OrganicProperty<string>('uuid'))
        .child(
          new OrganicContainer<ExampleTree>('personal')
            .child(
              new OrganicProperty<void | string>('firstName').link('surname', 'personal/surname', { absolute: true }),
            )
            .child(new OrganicProperty<void | string>('surname')),
        );
      exampleTree.peripherals({}).hydrate();
      const firstName = exampleTree.children[1].children[0];
      const surname = exampleTree.children[1].children[1];
      expect(firstName.links.find((link) => link.path === 'personal/surname').field).to.equal(surname);
    });
  });

  describe('Organic Property Validator', () => {
    it('can set a organic property validator check', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const fakeValidator = () => ({ passed: true });
      exampleProperty.validator(fakeValidator);
      expect(exampleProperty.validators.length).to.equal(1);
    });

    it('can set multiple organic property validator checks', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const fakeValidatorOne = (property) => ({ passed: true });
      const fakeValidatorTwo = (property) => ({ passed: true });
      exampleProperty.validator(fakeValidatorOne, fakeValidatorTwo);
      expect(exampleProperty.validators.length).to.equal(2);
    });

    it('can determine an organic property as passed after passing a single validator check', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
      const fakeValidator = () => ({ passed: true });
      exampleProperty.validator(fakeValidator);
      exampleProperty.value('Example');
      exampleProperty.hydrate(exampleRoot);
      expect(exampleProperty.hydrated.validators).to.deep.equal({
        passed: true,
      });
    });

    it('can determine an organic property as not passed after passing a single validator check', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
      const fakeValidator = () => ({ passed: false });
      exampleProperty.validator(fakeValidator);
      exampleProperty.value('Example');
      exampleProperty.hydrate(exampleRoot);
      expect(exampleProperty.hydrated.validators).to.deep.equal({
        passed: false,
      });
    });
  });

  describe('Organic Property Condition', () => {
    it('can set a organic property condition check', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const fakeCondition = () => ({ passed: true });
      exampleProperty.condition(fakeCondition);
      expect(exampleProperty.conditions.length).to.equal(1);
    });

    it('can set multiple organic property condition checks', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const fakeConditionOne = (property) => ({ passed: true });
      const fakeConditionTwo = (property) => ({ passed: true });
      exampleProperty.condition(fakeConditionOne, fakeConditionTwo);
      expect(exampleProperty.conditions.length).to.equal(2);
    });

    it('can determine an organic property as passed after passing a single condition check', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
      const fakeCondition = () => ({ passed: true });
      exampleProperty.condition(fakeCondition);
      exampleProperty.value('Example');
      exampleProperty.hydrate(exampleRoot);
      expect(exampleProperty.hydrated.conditions).to.deep.equal({
        passed: true,
      });
    });

    it('can determine an organic property as not passed after passing a single condition check', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
      const fakeCondition = () => ({ passed: false });
      exampleProperty.condition(fakeCondition);
      exampleProperty.value('Example');
      exampleProperty.hydrate(exampleRoot);
      expect(exampleProperty.hydrated.conditions).to.deep.equal({
        passed: false,
      });
    });
  });
});
