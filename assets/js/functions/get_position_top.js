function get_position_top(selector) {
  return selector.getBoundingClientRect().top + document.documentElement.scrollTop;
}

export default get_position_top;
