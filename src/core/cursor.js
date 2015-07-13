export default class Cursor {

    constructor(query) {
        this.query = query;
        this.data = null;

        // TODO: Add reactive methods so we don't need to load everything in memory
        this._setData = this._setData.bind(this);
        this.query.fetch(this._setData);
    }

    _setData(data) {
        this.data = data;
    }

    forEach(callback, thisArg) {

    }

    map(callback, thisArg) {

    }

    fetch() {
        return this.data;
    }

    count() {
        return this.data.length;
    }

    observe() {

    }

    observeChanges() {

    }
}
