import fresh_push from "@/assets/js/functions/array/fresh_push.array";
import empty from "@/assets/js/functions/empty";

const set_data = (key, data) => {
  if (process.server) return;
  localStorage.setItem(key, JSON.stringify(data));
};

const get_data = (key) => {
  if (process.server) return null;
  const data = localStorage.getItem(key);

  if (data === "undefined") return null;

  return JSON.parse(data);
};

const remove_data = (key) => {
  if (process.server) return null;
  return localStorage.removeItem(key);
};

class Base {

  constructor(key){
    this.key = key;
  }

  get(){
    throw new Error("Abstract Method has no implementation --> get()");
  }

  set(data){
    set_data(this.key, data);
  }

  static create(key){
    return new SimpleStorage(key);
  }
}

class SimpleStorage extends Base {

  constructor(key){
    super(key);
  }

  get(){
    return get_data(this.key);
  }

  set(data){
    set_data(this.key, data);
  }

  remove(){
    remove_data(this.key);
  }

  static removeItem(key){
    return remove_data(key);
  }

  static getItem(key){
    return get_data(key);
  }

  static setItem(key, value){
    return set_data(key, value);
  }

  static create(key){
    return new SimpleStorage(key);
  }
}

class BooleanStorage extends SimpleStorage {

  constructor(key){
    super(key);
  }

  get(){
    const value = super.get();
    return value === true || value === "true" || value === 1 || value === "1";
  }

  set(value){
    super.set(value === true || value === "true" || value === 1 || value === "1");
  }

  static create(key){
    return new BooleanStorage(key);
  }
}

class ArrayStorage extends Base {

  constructor(key){
    super(key);
  }

  get(){
    let data = get_data(this.key);

    if (!data || !Array.isArray(data))
      data = [];

    return data;
  }

  includes(value){
    let data = this.get();

    return data.includes(value);
  }

  push(...inputs){
    let data = this.get();

    for (const item of inputs)
      data.push(item);

    this.set(data);
  }

  fresh_push(...inputs){
    let data = this.get();

    data = fresh_push(data, inputs);

    this.set(data);
  }

  remove(value){
    let data = this.get();

    if (Array.isArray(value))
      data = data.filter((item) => !value.includes(item));
    else
      data.splice(value, 1);

    this.set(data);
  }

  toggle(value){
    if (this.includes(value))
      this.remove(value);
    else
      this.fresh_push(value);
  }

  reset(){
    this.set([]);
  }

  static create(key){
    return new ArrayStorage(key);
  }
}

export {
  SimpleStorage,
  BooleanStorage,
  ArrayStorage,
};
