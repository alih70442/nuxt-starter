function get_date(timestamp) {
  return new Date(timestamp).toLocaleDateString("fa-IR");
}

function get_date_en(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-CA");
}

function get_latin_date(timestamp) {
  const split_date = (new Date(timestamp)).toLocaleDateString("en-US").split("/");
  return `${split_date[2]}-${split_date[0]}-${split_date[1]}`;
}

function get_date_year(timestamp) {
  return get_date(timestamp).split("/")[0];
}

function get_time(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-GB").slice(0, -3);
}

function get_date_time(timestamp) {
  return get_time(timestamp) + " - " + get_date(timestamp);
}

function get_time_week_day(timestamp) {
  if (!timestamp) return;
  return new Intl.DateTimeFormat("fa-IR", { weekday: "short" }).format(new Date(timestamp));
}

function get_time_month_day(timestamp) {
  if (!timestamp) return;
  return new Intl.DateTimeFormat("fa-IR", { day: "numeric" }).format(new Date(timestamp));
}

function get_time_month_name(timestamp) {
  if (!timestamp) return;
  return new Intl.DateTimeFormat("fa-IR", { month: "short" }).format(new Date(timestamp));
}

const weekdays = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const get_time_next_weekday = weekday => {
  const day_index = weekdays[weekday];

  var d = new Date();
  d.setDate(d.getDate() + ((day_index + 7 - d.getDay()) % 7 || 7));

  return d;
};

const get_time_prev_weekday = weekday => {
  const day_index = weekdays[weekday];

  var d = new Date();
  d.setDate(d.getDate() + ((day_index - 7 - d.getDay()) % 7 || 7));

  return d;
};

const get_time_diff_hours = (date_1, date_2) => {
  return Math.abs(date_1 - date_2) / 36e5;
};

const get_date_human = (timestamp) => {
  return get_time_month_day(timestamp) + " " + get_time_month_name(timestamp) + " " + get_date_year(timestamp);
};

const get_date_time_human = (timestamp) => {
  return get_date_human(timestamp) + " - " + get_time(timestamp);
};

export {
  get_date,
  get_date_en,
  get_time,
  get_date_year,
  get_date_time,
  get_time_week_day,
  get_time_month_day,
  get_time_month_name,
  get_time_next_weekday,
  get_time_prev_weekday,
  get_latin_date,
  get_time_diff_hours,
  get_date_human,
  get_date_time_human,
};
