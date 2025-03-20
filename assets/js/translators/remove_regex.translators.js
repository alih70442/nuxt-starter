function remove_regex(value, regex) {
  return value.toString().replace(regex, "");
}

export default remove_regex;
