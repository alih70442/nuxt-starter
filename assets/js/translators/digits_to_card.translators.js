function digits_to_card(value) {
  value = value.replace(/-/g, "");
  let new_value = "";
  for (let i = 0; value.length > i; i++) {
    if (i % 4 === 0 && i !== 0)
      new_value += "-";
    new_value += value[i];
  }

  return new_value;
}

export default digits_to_card;
