function numbers_to_currency(value) {
  if (!value) return value;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default numbers_to_currency;
