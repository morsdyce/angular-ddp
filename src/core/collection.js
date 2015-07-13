import Cursor from './cursor';
import LocalDB from './localdb';
import DDPProvider from './../ddp-provider';
import assign from 'object-assign';

export default class Collection {

    constructor(name) {
        this.name = name;
        this.db = new LocalDB();
        this.collection = this.db.getCollection(name);
        this.connection = DDPProvider.getConnection();

        this._init();
    }

    _init() {
        this._registerHandlers();
        this._subscribe();
    }

    _registerHandlers() {
        this.connection.on('added', this._handleAdded.bind(this));
    }

    _handleAdded(message) {
        console.log(message);
        if (this.name === message.collection) {
            let doc = {
                id: message.id
            };

            assign(doc, message.fields);
            this.insert(doc);
        }
    }

    _subscribe() {
        if (this.connection.connected) {
            this.connection.sub(this.name);
        } else {
            this.connection.on('connected', () => {
                this.connection.sub(this.name);
            });
        }
    }

    find(selector = {}, options = {}) {
        return new Cursor(this.collection.find(selector, options));
    }

    findOne(selector = {}, options = {}) {
        return this.collection.findOne(selector, options);
    }

    insert(doc, callback) {
        return this.collection.upsert(doc, callback);
    }

    remove(selector, callback) {
        return this.remove(selector, callback);
    }

    update(selector, mod, options, callback) {
        return this.upsert(selector, mod, options, callback);
    }

    upsert(selector, mod, options, callback) {

    }

}
