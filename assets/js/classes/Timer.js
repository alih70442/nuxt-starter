import Base from "./Base";

export default class Timer extends Base {

  constructor(options = {}) {
    super(options);

    this.options = {
      selector: undefined,
      sec: undefined,
      min: undefined,
      hour: undefined,
      day: undefined,
      init_time: undefined,
      on_start: () => {
      },
      on_end: () => {
      },
    };
    this.options = Object.assign(this.options, options);

    this.selector = this.options.selector;
    // this.options.init_time = this.options.init_time;

    this.sec = this.options.sec;
    this.min = this.options.min;
    this.hour = this.options.hour;
    this.day = this.options.day;

    this.interval = null;
    this.curr_time = this.options.init_time;

    this.init();
    this.events();
  }

  init() {

  }

  events() {
  };

  start() {
    const obj = this;
    obj.options.on_start();

    calc_and_print(obj.curr_time);

    obj.curr_time--;

    obj.interval = setInterval(() => {

      calc_and_print(obj.curr_time);

      if (obj.curr_time <= 0) {
        clearInterval(obj.interval);

        if (obj.day)
          obj.day.innerText = Timer.decorate(0);
        if (obj.hour)
          obj.hour.innerText = Timer.decorate(0);
        if (obj.min)
          obj.min.innerText = Timer.decorate(0);
        if (obj.sec)
          obj.sec.innerText = Timer.decorate(0);

        obj.options.on_end();
      }

      obj.curr_time--;

    }, 1000);

    function calc_and_print(distance) {

      const day = Math.floor(distance / (60 * 60 * 24));
      const hour = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
      const min = Math.floor((distance % (60 * 60)) / (60));
      const sec = Math.floor((distance % (60)));

      if (obj.day)
        obj.day.innerText = Timer.decorate(day);
      if (obj.hour)
        obj.hour.innerText = Timer.decorate(hour);
      if (obj.min)
        obj.min.innerText = Timer.decorate(min);
      if (obj.sec)
        obj.sec.innerText = Timer.decorate(sec);
    }
  }

  restart() {
    this.curr_time = this.options.init_time;
    clearInterval(this.interval);
    this.start();
  }

  pause() {
    clearInterval(this.interval);
  }

  is_finished() {
    return this.curr_time === -1;
  }

  get_remaining() {
    return this.curr_time;
  }

  set_on_start_cb(cb) {
    if (cb)
      this.options.on_start = cb;
  }

  set_on_end_cb(cb) {
    if (cb)
      this.options.on_end = cb;
  }

  static format_digitally(time) {

    return {
      day: Math.floor(time / (60 * 60 * 24)),
      hour: Math.floor((time % (60 * 60 * 24)) / (60 * 60)),
      min: Math.floor((time % (60 * 60)) / (60)),
      sec: Math.floor((time % (60))),
    };
  }

  static decorate(input_num) {
    if (input_num < 10)
      return "0" + input_num;
    return input_num;
  }

  static create(options = {}) {
    return new Timer(options);
  }
}