import { expect } from 'chai';
import OrganicContainer from '../OrganicContainer';
import OrganicProperty from '../OrganicProperty';
import OrganicRoot from '../OrganicRoot';

describe('Organic/OrganicContainer', () => {
  describe('Organic Container Children', () => {
    it('can have a child added to the container', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const exampleContainer = new OrganicContainer<void | string>('exampleContainer');
      exampleContainer.child(exampleProperty);
      expect(exampleContainer.children.length).to.equal(1);
      expect(exampleContainer.children[0]).to.equal(exampleProperty);
    });
  });

  describe('Organic Container Validator', () => {
    it('can validate against provided child validator results', () => {
      const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>();
      const exampleFields = new OrganicContainer<{
        firstName?: string;
        surname?: string;
      }>('person')
        .child(new OrganicProperty<void | string>('firstName').validator(() => ({ passed: false })))
        .child(new OrganicProperty<void | string>('surname').validator(() => ({ passed: true })));
      exampleRoot.child(exampleFields);
      exampleFields
        .value({
          firstName: 'Johnny',
          surname: 'Example',
        })
        .hydrate(exampleRoot);
      expect(exampleFields.hydrated.validators).to.deep.equal({ passed: false });
    });
  });
});
