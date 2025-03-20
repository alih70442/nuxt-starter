function is_phone_validated(number) {
  return number.length === 11 && /^0\d+$/.test(number);
}

export { is_phone_validated };

