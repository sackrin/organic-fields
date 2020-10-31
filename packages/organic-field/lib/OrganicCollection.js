"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrganicProperty_1 = __importDefault(require("@src/OrganicProperty"));
const OrganicChildren_1 = __importDefault(require("@src/OrganicChildren"));
class OrganicCollection extends OrganicProperty_1.default {
    constructor(machine) {
        super(machine);
        this._children = new OrganicChildren_1.default();
    }
    get children() {
        return this._children;
    }
    child(field) {
        this._children.push(field);
        return this;
    }
    value(val) {
        if (val) {
            this._value = val;
            return this;
        }
        else if (this._children.length > 0) {
            return this._children.value();
        }
    }
}
exports.default = OrganicCollection;
