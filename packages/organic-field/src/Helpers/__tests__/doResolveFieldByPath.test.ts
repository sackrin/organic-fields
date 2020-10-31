import { expect } from 'chai';
import doResolveFieldByPath from '../doResolveFieldByPath';
import OrganicProperty from '../../OrganicProperty';
import OrganicRoot from '../../OrganicRoot';
import OrganicContainer from '../../OrganicContainer';

type ExampleTree = {
  uuid: string;
  person: {
    firstName: void | string;
    surname: void | string;
  };
};

describe('Organic/Helpers/doResolveFieldByPath', () => {
  const exampleRoot = new OrganicRoot<{ exampleProperty: void | string }, {}>()
    .child(new OrganicProperty<string>('uuid'))
    .child(
      new OrganicContainer<ExampleTree>('personal')
        .child(new OrganicProperty<void | string>('firstName'))
        .child(new OrganicProperty<void | string>('surname')),
    );

  it('can retrieve another field with the same parent', () => {
    const firstName = exampleRoot.children[1].children[0];
    const surname = exampleRoot.children[1].children[1];
    const resolvedField = doResolveFieldByPath(firstName, './surname');
    expect(surname).to.equal(resolvedField);
  });

  it('can retrieve another field up a level from the parent', () => {
    const firstName = exampleRoot.children[1].children[0];
    const uuid = exampleRoot.children[0];
    const resolvedField = doResolveFieldByPath(firstName, '../uuid');
    expect(uuid).to.equal(resolvedField);
  });

  it('can retrieve the parent of the field using the ./ path', () => {
    const firstName = exampleRoot.children[1].children[0];
    const personal = exampleRoot.children[1];
    const resolvedField = doResolveFieldByPath(firstName, './');
    expect(personal).to.equal(resolvedField);
  });

  it('can retrieve the parent of the field using the __parent__ token', () => {
    const firstName = exampleRoot.children[1].children[0];
    const personal = exampleRoot.children[1];
    const resolvedField = doResolveFieldByPath(firstName, '__parent__');
    expect(personal).to.equal(resolvedField);
  });

  it('can use a discriminator to return the field on a field which exists at path', () => {
    const firstName = exampleRoot.children[1].children[0];
    const uuid = exampleRoot.children[0];
    const resolvedField = doResolveFieldByPath(firstName, '../uuid', (field) => field);
    expect(resolvedField).to.equal(uuid);
  });

  it('can use a discriminator to return undefined on a field which exists at path', () => {
    const firstName = exampleRoot.children[1].children[0];
    const resolvedField = doResolveFieldByPath(firstName, '../uuid', (field) => undefined);
    expect(resolvedField).to.equal(undefined);
  });

  it('can return undefined for a field which does not exist up a level from the parent', () => {
    const firstName = exampleRoot.children[1].children[0];
    const resolvedField = doResolveFieldByPath(firstName, '../missing');
    expect(resolvedField).to.equal(undefined);
  });

  it('can return undefined when attempted to retrieve a ../ path with no parents parent', () => {
    const uuid = exampleRoot.children[0];
    const resolvedField = doResolveFieldByPath(uuid, '../');
    expect(resolvedField).to.equal(undefined);
  });

  it('can return undefined when attempted to retrieve a __parent__ path with no parent', () => {
    const exampleField = new OrganicProperty<string>('exampleField');
    const resolvedField = doResolveFieldByPath(exampleField, '__parent__');
    expect(resolvedField).to.equal(undefined);
  });

  it('can return undefined when attempted to retrieve a ./ path with no parent', () => {
    const exampleField = new OrganicProperty<string>('exampleField');
    const resolvedField = doResolveFieldByPath(exampleField, './');
    expect(resolvedField).to.equal(undefined);
  });
});
