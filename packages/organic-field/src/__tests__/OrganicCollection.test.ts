import { expect } from 'chai';
import OrganicCollection from '../OrganicCollection';
import OrganicProperty from '../OrganicProperty';

describe('Organic/OrganicCollection', () => {
  describe('Organic Collection Children', () => {
    it('can have a child added to the collection', () => {
      const exampleProperty = new OrganicProperty<void | string>('exampleProperty');
      const exampleCollection = new OrganicCollection<void | string>('exampleCollection');
      exampleCollection.child(exampleProperty);
      expect(exampleCollection.children.length).to.equal(1);
      expect(exampleCollection.children[0]).to.equal(exampleProperty);
    });
  });
});
