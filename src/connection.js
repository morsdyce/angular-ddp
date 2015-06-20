import DDP from 'ddp.js';

export class Connection {

  constructor(config) {
    this._instance    = new DDP(config);
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
