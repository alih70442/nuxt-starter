import remove_all from "@/assets/js/functions/array/remove_all.array";

function fresh_push(arr, needle) {
  arr = remove_all(arr, needle);

  if (Array.isArray(needle))
    for (const item of needle)
      arr.push(item);
  else
    arr.push(needle);

  return arr;
}

export default fresh_push;
