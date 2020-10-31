"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrganicChildren extends Array {
    constructor() {
        super();
    }
    value() {
        return this.reduce((curr, item) => {
            return Object.assign(Object.assign({}, curr), { [item.machine]: item.value() });
        }, {});
    }
}
exports.default = OrganicChildren;
