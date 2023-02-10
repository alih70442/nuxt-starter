function bubble_sort_according_array(array, pattern_array) {
  const arr = Array.from(array);
  const pattern_arr = Array.from(pattern_array);
  for (let i = 1; i < pattern_arr.length; i++) {
    for (let j = 0; j < pattern_arr.length - i; j++) {
      if (pattern_arr[j] > pattern_arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        [pattern_arr[j], pattern_arr[j + 1]] = [pattern_arr[j + 1], pattern_arr[j]];
      }
    }
  }
  return arr;
}

export default bubble_sort_according_array;
