function show_currency(currency_in_rial, round = true) {
  if (!currency_in_rial) return currency_in_rial;

  let value = +currency_in_rial / 10;
  if (round)
    return Math.round(value);

  return value;
}

export default show_currency;
