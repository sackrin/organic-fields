import { expect } from 'chai';
import Field from '../Field';

describe('Organic/Field', () => {
  it('can create a simple organic field', () => {
    const exampleField = Field<void>('exampleField', 'STRING');
    expect(exampleField.machine).to.equal('exampleField');
    expect(exampleField.context).to.equal('STRING');
    expect(exampleField.value()).to.be.undefined;
  });

  // FIELD VALUES

  it('can provide a simple method for getting and setting the value', () => {
    const exampleField = Field<void | string>('exampleField', 'STRING');
    exampleField.value('John');
    expect(exampleField.value()).to.equal('John');
  });

  it('can allow the set value to be overwritten', () => {
    const exampleField = Field<void | string>('exampleField', 'STRING');
    exampleField.value('John');
    exampleField.value('Barry');
    expect(exampleField.value()).to.equal('Barry');
  });

  it('can allow for the value to be set to undefined', () => {
    const exampleField = Field<void | string>('exampleField', 'STRING');
    exampleField.value('John');
    exampleField.value(undefined);
    expect(exampleField.value()).to.be.undefined;
  });

  // FIELD ATTRIBUTES

  it('can set a field attribute', () => {
    const exampleField = Field<void | string>('exampleField', 'STRING');
    exampleField.attribute<{ type: string }>('dog', { type: 'beagle' });
    expect(exampleField.attribute('dog')).to.deep.equal({ type: 'beagle' });
  });

  it('can update a field attribute', () => {
    const exampleField = Field<void | string>('exampleField', 'STRING');
    exampleField.attribute<{ type: string }>('dog', { type: 'beagle' });
    exampleField.attribute<{ type: string }>('dog', { type: 'poodle' });
    expect(exampleField.attribute('dog')).to.deep.equal({ type: 'poodle' });
  });

  it('can return a number of set field attributes', () => {
    const exampleField = Field<void | string>('exampleField', 'STRING');
    exampleField.attribute<{ type: string }>('dog', { type: 'beagle' });
    exampleField.attribute<{ type: string }>('cat', { type: 'tabby' });
    expect(exampleField.attributes).to.deep.equal({
      dog: { type: 'beagle' },
      cat: { type: 'tabby' },
    });
  });

  // FIELD CHILDREN

  it('can set child fields', () => {

  });
});
