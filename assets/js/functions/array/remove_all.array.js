function remove_all(arr, needle) {
  if (!Array.isArray(needle))
    needle = [needle];
  return arr.filter(item => !needle.includes(item));
}

export default remove_all;
