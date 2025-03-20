export default class Base {

  static global_selector;
  static global_elements = [];

  constructor(options = {}) {

    this.options = {
      selector: undefined,
    };
    this.options = Object.assign(this.options, options);
    this.selector = options.selector;
    Base.global_elements.push({
      selector: this.selector,
      object: this,
    });
  }

  init() {
    throw new Error("Abstract Method has no implementation");
  }

  events() {
    throw new Error("Abstract Method has no implementation");
  }

  static get_object(selector) {
    let founded = this.global_elements.filter(function (element) {
      if (element.selector === selector)
        return element;
    });
    return founded.length ? founded[0].object : false;
  }

  static get_selector(object) {
    let founded = this.global_elements.filter(function (element) {
      if (element.object == object)
        return element.selector;
    });
    return founded.length ? founded[0].selector : false;
  }

  static is_object(object) {
    let founded = this.get_selector(object);
    return typeof (founded) !== "boolean";
  }

  static is_selector(selector) {
    let founded = this.get_object(selector);
    return typeof (founded) !== "boolean";
  }

  static instances() {
    throw new Error("Abstract Method has no implementation");
  }

  static create(options = {}) {
    throw new Error("Abstract Method has no implementation");
  }
}