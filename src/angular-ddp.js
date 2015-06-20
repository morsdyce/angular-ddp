import { Connection } from 'connection';

const buildOptions = Symbol();

class DDPProvider {

  connect(host, ssl, interceptor) {
    this._config = DDPProvider[buildOptions](host, ssl, interceptor);
  }

  $get() {
    return new Connection(this._config);
  }

  static [buildOptions](host, ssl, interceptor) {
    let SocketConstructor       = WebSocket;
    let socketName              = SocketConstructor.name.toLowerCase();
    let endpoint                = (ssl ? "wws://" : "ws://") + host + "/" + socketName;
    let socketInterceptFunction = interceptor || angular.noop;

    return { endpoint, SocketConstructor, socketInterceptFunction }
  }
}

export default angular.module('angular-ddp', [])
  .provider('DDP', DDPProvider);
