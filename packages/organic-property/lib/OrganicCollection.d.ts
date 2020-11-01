import OrganicProperty from '@src/OrganicProperty';
import OrganicChildren from '@src/OrganicChildren';
declare class OrganicCollection<V> extends OrganicProperty<V> {
    private _children;
    constructor(machine: any);
    get children(): OrganicChildren<V>;
    child<C>(field: OrganicProperty<C>): this;
    value(): V;
    value(val: V): this;
}
export default OrganicCollection;
//# sourceMappingURL=OrganicCollection.d.ts.map