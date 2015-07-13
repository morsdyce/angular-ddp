import Connection from './core/connection';

const buildOptions = Symbol();
let connection = null;

export default class DDPProvider {

    connect(host, ssl, interceptor) {
        this._config = DDPProvider[buildOptions](host, ssl, interceptor);
    }

    $get() {
        if (!connection) {
            connection = new Connection(this._config);
        }

        return connection;
    }

    static [buildOptions](host, ssl, interceptor) {
        let SocketConstructor = WebSocket;
        let socketName = SocketConstructor.name.toLowerCase();
        let endpoint = (ssl ? "wws://" : "ws://") + host + "/" + socketName;
        let socketInterceptFunction = interceptor || angular.noop;

        return {endpoint, SocketConstructor, socketInterceptFunction}
    }

    static getConnection() {
        return connection;
    }
}
