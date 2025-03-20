function get_object_value(key, object) {
  if (!key) return;
  return key.split(".").reduce((o, k) => o?.[k], object);
}

window.get_object_value = get_object_value;

export default get_object_value;
