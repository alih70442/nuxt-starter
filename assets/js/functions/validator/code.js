function is_code_validated(number) {
  return number.length === 6 && /^\d+$/.test(number);
}

export default is_code_validated;
