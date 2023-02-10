export default class Timeout {
    constructor(options = {}) {

        this.options = {
            time: 1000,
            callback: () => { }
        };
        this.options = Object.assign(this.options, options);

        this.timeout;
        this.callback = this.options.callback;
        this.time = this.options.time;
    }

    clear() {
        clearTimeout(this.timeout);
    }

    init() {
        const obj = this;
        obj.timeout = setTimeout(() => {
            obj.callback();
        }, obj.time);
    }

    call_instantly() {
        this.clear();
        this.options.callback();
    }

    set_time(new_time) {
        this.time = new_time;
    }

    set_callback(cb) {
        this.callback = cb;
    }

    static create(options) {
        return new Timeout(options);
    }
}