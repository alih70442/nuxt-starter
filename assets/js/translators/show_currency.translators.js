function show_currency(currency_in_rial) {
  return Math.ceil(+currency_in_rial / 10);
}

export default show_currency;
