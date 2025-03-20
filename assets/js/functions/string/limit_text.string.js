function limit_text(text, limit_chars_count, more_icon = "...") {
  return text.length > limit_chars_count ? text.substring(0, limit_chars_count) + more_icon : text;
}

export default limit_text;
