import { expect } from 'chai';
import OrganicContainer from '../OrganicContainer';
import OrganicProperty from '../OrganicProperty';

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
});
