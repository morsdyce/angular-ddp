import DDP from 'ddp.js';
import Collection from './collection';

export default class Connection {

    constructor(config) {
        this._instance = new DDP(config);
        this.connected = false;

        this._init();
    }

    _init() {
        this.on('connected', () => this.connected = true);
        this.on('disconnected', () => this.connected = false);
    }

    on(event, cb) {
        this._instance.on(event, e => cb(e))
    }

    sub(name, params, onReady, onStop, onError) {
        return this._instance.sub(name, params, onReady, onStop, onError);
    }

    call(method, params, onResult, onUpdated) {
        this._instance.method(method, params, onResult, onUpdated);
    }

}
