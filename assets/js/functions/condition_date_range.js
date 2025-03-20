const condition_date_range = (date_from, date_to, value, default_value) => {
  const now = new Date();

  if (date_from < now && date_to > now)
    return value;

  return default_value ?? null;
};

export default condition_date_range;
