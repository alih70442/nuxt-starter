const is_like_match = (key, suspect) => {
  if (!suspect) return;
  key = key.toLowerCase().replace(/ /g, "");
  suspect = suspect.toLowerCase().replace(/ /g, "");
  if (suspect.length < key.length) return;

  const split_suspect = suspect.split("");
  const split_key = key.split("");

  let search_match_count = 0;
  for (const char of split_suspect) {
    if (split_key[search_match_count] === char)
      search_match_count++;
  }

  return search_match_count === key.length;
};

export default is_like_match;
