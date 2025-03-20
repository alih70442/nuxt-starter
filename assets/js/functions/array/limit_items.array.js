function limit_items(arr, end, start = 0) {
  let temp = [];
  for (let i = start; end > i; i++) {
    if (!arr[i]) break;
    temp.push(arr[i]);
  }
  return temp;
}

export default limit_items;
