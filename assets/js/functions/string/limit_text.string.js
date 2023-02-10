function limit_text(text, limit_chars_count) {
  return text.length > limit_chars_count ? text.substring(0, limit_chars_count) + "..." : text;
}

export default limit_text;
