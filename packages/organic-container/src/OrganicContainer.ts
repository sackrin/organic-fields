import OrganicCoreContainer from '@sackrin/organic-core/OrganicCoreContainer';

class OrganicContainer<V> extends OrganicCoreContainer<V> {
  constructor(machine: string) {
    super(machine);
  }
}

export default OrganicContainer;
