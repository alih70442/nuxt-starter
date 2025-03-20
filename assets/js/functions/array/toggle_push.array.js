import remove_all from "@/assets/js/functions/array/remove_all.array";

function toggle_push(arr, needle) {

  if (arr.includes(needle)) {
    arr = remove_all(arr, needle);
  } else {
    arr = remove_all(arr, needle);
    arr.push(needle);
  }

  return arr;
}

export default toggle_push;
