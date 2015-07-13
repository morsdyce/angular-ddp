import Collection from './core/collection';

export default class DDPCollectionService {

    constructor() {
        this._collections = new Map();
    }

    get(name) {

        if (this._collections.has(name)) {
            return this._collections.get(name);
        }

        let collection = new Collection(name);
        this._collections.set(name, collection);

        return collection;
    }
}
