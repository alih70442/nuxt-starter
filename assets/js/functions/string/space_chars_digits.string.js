function space_chars_digits(text) {
  if (!text) return text;

  text = text.replace(/(\d+\/\d+|\d+)/g, function(_, num) {
    return " " + num + " ";
  });

  return text.trim();
}

export default space_chars_digits;
