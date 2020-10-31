import OrganicContainer from './OrganicContainer';

class OrganicRoot<V> extends OrganicContainer<V> {
  constructor() {
    super('root');
  }
}

export default OrganicRoot;
