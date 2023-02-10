function numbers_to_currency(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default numbers_to_currency;
