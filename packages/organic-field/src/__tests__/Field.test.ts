import { expect } from 'chai';
import Field from '../Field';

describe('Organic/Field', () => {
  it('can create a simple organic field', () => {
    const exampleField = Field<void>('exampleField', 'STRING');
    expect(exampleField.machine).to.equal('exampleField');
    expect(exampleField.context).to.equal('STRING');
    expect(exampleField.value()).to.be.undefined;
  });

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
});
