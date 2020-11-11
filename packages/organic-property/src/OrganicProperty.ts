import OrganicCoreProperty from '@sackrin/organic-core/OrganicCoreProperty';

class OrganicProperty<V, A = { [k: string]: any }> extends OrganicCoreProperty<V> {
  constructor(machine: string) {
    super(machine);
  }
}

export default OrganicProperty;
