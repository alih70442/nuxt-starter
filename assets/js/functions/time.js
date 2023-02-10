function get_date(timestamp) {
  return (new Date(timestamp)).toLocaleDateString("fa-IR");
}

function get_time(timestamp) {
  return (new Date(timestamp)).toLocaleTimeString("en-GB");
}

export {
  get_date,
  get_time
};
