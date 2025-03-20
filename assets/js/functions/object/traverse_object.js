const traverse_object = (key_selection, object) => {
  const keys = key_selection.split(".");

  let value = object;
  for (const key of keys) {
    value = value?.[key];
  }

  return value;
};

export default traverse_object;