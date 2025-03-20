import empty from "../functions/empty";

class Caching {

  static items = [];

  constructor(name) {
    this.name = name;

    Caching.items.push(name);

    this.data = JSON.parse(localStorage.getItem(this.name));
  }

  set(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
  }

  get() {
    return new Promise(resolve => resolve(this.data));
  }

  is_cached() {
    return !empty(this.data);
  }

  static async request(name, func) {
    const cache = Caching.create(name);

    if (cache.is_cached()) {
      return cache.get();
    } else {
      const request_rs = await func();
      cache.set(request_rs);
      return func();
    }
  }

  static bust_caches() {
    for (const key in localStorage) {
      if (key.includes("temp-") || key.includes("cache-"))
        localStorage.removeItem(key);
    }
  }

  static create(name) {
    return new Caching(name);
  }

  static cache_now(name, data) {
    Caching.items.push(name);
    localStorage.setItem(name, JSON.stringify(data));
  };

  static get_cache(name) {
    return JSON.parse(localStorage.getItem(name));
  }

}

export default Caching;
