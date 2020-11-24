import { expect } from 'chai';
import OrganicProperty from '../OrganicProperty';
import OrganicRoot from '../OrganicRoot';

describe('Organic/OrganicProperty', () => {
  it('can do stuff', () => {
    const Something = new OrganicRoot()
      .child(
        new OrganicProperty<string>('firstName')
          .about('This is a first name property')
          .value('Hello')
          .tag('details')
          .attribute('label', 'First Name', (root, property) => true)
          .attribute('label', 'Simpsons Last Name', (root, property) => false)
          .condition(
            () => ({ passed: false }),
            (root, property) => false,
          )
          .validator(
            () => ({ passed: false }),
            (root, property) => false,
          ),
      )
      .child(new OrganicProperty<string>('lastName').value('Richards'));
  });
});
