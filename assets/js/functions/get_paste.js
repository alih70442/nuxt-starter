function get_paste($event) {
  $event.preventDefault();
  return ($event.originalEvent || $event).clipboardData.getData("text/plain");
}

export default get_paste;
