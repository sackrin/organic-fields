"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrganicProperty {
    constructor(machine) {
        this._machine = machine;
        this._attributes = {};
        this._conditions = [];
    }
    get machine() {
        return this._machine;
    }
    get attributes() {
        return this._attributes;
    }
    get conditions() {
        return this._conditions;
    }
    value(...args) {
        // Deconstruct the possible value from the args
        const [value] = args;
        // If there is one arg we are setting the value for this property
        if (args.length === 1) {
            // Update the value of the property
            // @TODO Apply middlewares to allow sanitisation
            this._value = value;
            // Return the instance for chaining
            return this;
        } // Otherwise we are just trying to retrieve the value
        else {
            // @TODO Apply middleware to allow transformation
            return this._value;
        }
    }
    attribute(...args) {
        // Deconstruct the possible attribute key and value from the args
        const [key, value] = args;
        // Do a quick sanity check
        // We need at least one argument in order for this method to work correctly
        if (!key)
            throw new Error('invalid organic property arguments passed');
        // If we are only passing one arg we are attempt to fetch an arg value
        if (args.length === 1) {
            // Return the fetched arg
            return this._attributes[key];
        } // Otherwise
        else {
            // Update the value of the attribute
            this._attributes[key] = value;
            // Return the instance for chaining
            return this;
        }
    }
    condition(...checks) {
        // Merge the conditions into the list of conditions
        this._conditions = [...this._conditions, ...checks];
        // Return the instance for chaining
        return this;
    }
}
exports.default = OrganicProperty;
