class Cookie {

  constructor(key) {
    this.key = key;
  }

  _get() {
    let name = this.key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  _set(cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = this.key + "=" + cvalue + ";" + expires + ";path=/";
  }

  remove() {
    this._set(this.key, 0);
  }

  static create(key) {
    return new Cookie(key);
  }
}

class SimpleCookie extends Cookie {

  constructor(key, value = "", days = 1) {
    super(key);
    if (value !== "")
      this.set(value, days);
  }

  get() {
    return super._get();
  }

  set(value, days) {
    super._set(value, days);
  }

  static create(key, value = "", days = 1) {
    return new SimpleCookie(key, value, days);
  }
}

class BooleanCookie extends Cookie {

  constructor(key) {
    super(key);
  }

  get() {
    const value = super._get();
    return value === true || value === "true" || value === 1 || value === "1";
  }

  set(value, exdays) {
    super._set(value === true || value === "true" || value === 1 || value === "1", exdays);
  }

  static create(key) {
    return new BooleanCookie(key);
  }
}

class ArrayCookie extends Cookie {

  constructor(key) {
    super(key);
  }

  get() {
    let data = JSON.parse(localStorage.getItem(this.key));

    if (!data)
      data = [];

    return data;
  }

  push(...inputs) {
    let data = this.get();

    for (const item of inputs)
      data.push(item);

    this.set(data);
  }

  remove(index) {
    let data = this.get();

    data.splice(index, 1);

    this.set(data);
  }

  reset() {
    this.set([]);
  }

  static create(key) {
    return new ArrayCookie(key);
  }
}

export {
  BooleanCookie,
  ArrayCookie,
  SimpleCookie,
};