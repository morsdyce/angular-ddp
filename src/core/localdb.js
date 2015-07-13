import MiniMongo from 'minimongo';

export default class LocalDB {
    constructor() {
        this.database = new MiniMongo.MemoryDb();
        this.collections = new Map();
    }

    getCollection(name) {
        if (this.collections.has(name)) {
            return this.collections.get(name);
        }

        this.database.addCollection(name);

        // get the collection instance
        let collection = this.database[name];

        this.collections.set(name, collection);
        return collection;
    }

    removeCollection(name) {
        if (this.collections.has(name)) {
            this.collections.delete(name);
            this.database.removeCollection(name);
        }
    }

}
