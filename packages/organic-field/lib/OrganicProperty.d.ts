import { OrganicPropertyCondition } from '@src/Types/OrganicPropertyCondition';
declare class OrganicProperty<V, A = {
    [k: string]: any;
}> {
    protected _machine: string;
    protected _value?: V;
    protected _attributes?: A;
    protected _conditions?: any[];
    constructor(machine: string);
    get machine(): string;
    get attributes(): A;
    get conditions(): any[];
    value(): V;
    value(val: V): this;
    attribute<I>(name: any): I;
    attribute<I>(name: any, value: I): this;
    condition(...checks: OrganicPropertyCondition[]): void;
}
export default OrganicProperty;
//# sourceMappingURL=OrganicProperty.d.ts.map