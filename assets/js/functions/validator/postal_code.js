function is_postal_code_validated(postal_code) {
  return /\d\d\d\d\d\d\d\d\d\d/.test(postal_code) && postal_code?.length === 10;
}

export default is_postal_code_validated;

