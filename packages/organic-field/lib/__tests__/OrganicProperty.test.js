"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const OrganicProperty_1 = __importDefault(require("../OrganicProperty"));
describe('Organic/OrganicProperty', () => {
    it('can create a simple organic property', () => {
        const exampleProperty = new OrganicProperty_1.default('exampleProperty');
        chai_1.expect(exampleProperty.machine).to.equal('exampleProperty');
        chai_1.expect(exampleProperty.value()).to.be.undefined;
    });
    describe('Organic Property Values', () => {
        it('can provide a simple method for getting and setting the value', () => {
            const exampleProperty = new OrganicProperty_1.default('exampleProperty');
            exampleProperty.value('John');
            chai_1.expect(exampleProperty.value()).to.equal('John');
        });
        it('can allow the set value to be overwritten', () => {
            const exampleProperty = new OrganicProperty_1.default('exampleProperty');
            exampleProperty.value('John');
            exampleProperty.value('Barry');
            chai_1.expect(exampleProperty.value()).to.equal('Barry');
        });
        it('can allow for the value to be set to undefined', () => {
            const exampleProperty = new OrganicProperty_1.default('exampleProperty');
            exampleProperty.value('John');
            exampleProperty.value(undefined);
            chai_1.expect(exampleProperty.value()).to.be.undefined;
        });
    });
    describe('Organic Property Attributes', () => {
        it('can set a organic property attribute', () => {
            const exampleProperty = new OrganicProperty_1.default('exampleProperty');
            exampleProperty.attribute('dog', { type: 'beagle' });
            chai_1.expect(exampleProperty.attribute('dog')).to.deep.equal({
                type: 'beagle',
            });
        });
        it('can update a organic property attribute', () => {
            const exampleProperty = new OrganicProperty_1.default('exampleProperty');
            exampleProperty.attribute('dog', { type: 'beagle' });
            exampleProperty.attribute('dog', { type: 'poodle' });
            chai_1.expect(exampleProperty.attribute('dog')).to.deep.equal({
                type: 'poodle',
            });
        });
        it('can return a number of set organic property attributes', () => {
            const exampleProperty = new OrganicProperty_1.default('exampleProperty');
            exampleProperty.attribute('dog', { type: 'beagle' });
            exampleProperty.attribute('cat', { type: 'tabby' });
            chai_1.expect(exampleProperty.attributes).to.deep.equal({
                dog: { type: 'beagle' },
                cat: { type: 'tabby' },
            });
        });
        it('can throw an exception when attempting to fetch a attribute using an undefined property attribute key', () => {
            try {
                const exampleProperty = new OrganicProperty_1.default('exampleProperty');
                exampleProperty.attribute(undefined);
                chai_1.expect(true).to.equal(false);
            }
            catch (e) {
                chai_1.expect(e.message).to.equal('invalid organic property arguments passed');
            }
        });
    });
    describe('Organic Property Condition', () => {
        it('can set a organic property condition check', () => {
            const exampleProperty = new OrganicProperty_1.default('exampleProperty');
            const fakeCondition = () => ({ passed: true });
            exampleProperty.condition(fakeCondition);
            chai_1.expect(exampleProperty.conditions.length).to.equal(1);
        });
        it('can set multiple organic property condition checks', () => {
            const exampleProperty = new OrganicProperty_1.default('exampleProperty');
            const fakeConditionOne = (property) => ({ passed: true });
            const fakeConditionTwo = (property) => ({ passed: true });
            exampleProperty.condition(fakeConditionOne, fakeConditionTwo);
            chai_1.expect(exampleProperty.conditions.length).to.equal(2);
        });
    });
});
