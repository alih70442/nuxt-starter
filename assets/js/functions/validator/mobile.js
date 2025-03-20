function is_mobile_validated(number) {
  return /09\d\d\d\d\d\d\d\d\d/.test(number);
}

export default is_mobile_validated;

