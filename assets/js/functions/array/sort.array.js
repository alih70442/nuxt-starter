import bubble_sort_according_array from "@/assets/js/functions/array/bubble_sort_according_array.array";

function calc_letter_distance(search, suspect) {
  let search_index = 1;
  let i = suspect.indexOf(search.charAt(0));
  let found_indexes = [i];
  for (i; suspect.length > i; i++) {
    if (found_indexes.length === search.length)
      break;
    // update last found index if there is new occurrence
    if (suspect.charAt(i) === search.charAt(search_index - 1)) {
      found_indexes.pop();
      found_indexes.push(i);
    }
    if (suspect.charAt(i) === search.charAt(search_index)) {
      found_indexes.push(i);
      search_index++;
    }
  }

  return found_indexes[found_indexes.length - 1] - found_indexes[0];
}

function calc_first_occur_distance(search, suspect) {
  let first_occur = suspect.indexOf(search.charAt(0));
  return first_occur + 1;
}

function calc_length_distance(suspect) {
  return suspect.length;
}

function sort(arr, pattern_array) {
  if (!Array.isArray(arr) || !arr.length) return [];
  let temp_letter_distance = [];
  let temp_first_occur_distance = [];
  let temp_length_distance = [];


  for (let i = 0; i < arr.length; i++) {
    const word = arr[i].title;

    temp_letter_distance.push(calc_letter_distance(pattern_array, word) * 10000);
    temp_first_occur_distance.push(calc_first_occur_distance(pattern_array, word) * 100);
    temp_length_distance.push(calc_length_distance(word));
  }

  let temp = [];

  for (let i = 0; i < arr.length; i++) {
    temp.push(temp_letter_distance[i] + temp_first_occur_distance[i] + temp_length_distance[i]);
  }

  return bubble_sort_according_array(arr, temp);
}

export default sort;
