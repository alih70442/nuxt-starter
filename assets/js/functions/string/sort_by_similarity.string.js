const sort_by_similarity = (key, arr) => {
  key = key.toLowerCase();

  const highest_score = Math.max(...(arr.length));

  for (let item of arr) {
    item = item.toLowerCase();

    const split_suspect = suspect.split("");
    const split_key = key.split("");

    let search_match_count = 0;
    for (const char of split_suspect) {
      if (split_key[search_match_count] === char)
        search_match_count++;
    }
  }


  return search_match_count === key.length;
};

export default sort_by_similarity;
