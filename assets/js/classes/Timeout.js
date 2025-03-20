class Timeout {
  constructor(options = {}) {

    this.options = {
      duration: 1000,
      callback: () => {
      },
    };
    this.options = Object.assign(this.options, options);

    this.timeout;
    this.callback = this.options.callback;
    this.duration = this.options.duration;
  }

  is_running() {
    return Boolean(this.timeout);
  }

  clear() {
    if (this.timeout)
      clearTimeout(this.timeout);
  }

  init() {
    const obj = this;

    this.clear();

    obj.timeout = setTimeout(obj.callback, obj.duration);
  }

  call_instantly() {
    this.clear();
    this.options.callback();
  }

  set_time(new_time) {
    this.duration = new_time;
  }

  set_callback(cb) {
    this.callback = cb;
  }

  static create(options) {
    return new Timeout(options);
  }
}

export default Timeout;
