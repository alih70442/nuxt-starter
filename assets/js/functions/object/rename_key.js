function rename_key(object, old_key, new_key) {
  Object.defineProperty(object, new_key,
    Object.getOwnPropertyDescriptor(object, old_key));
  delete object[old_key];
}

export default rename_key;