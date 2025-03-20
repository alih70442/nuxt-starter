function is_sheba_validated(value) {
  return value.match(/(?=.{24}$)[0-9]*$/);
}

export default is_sheba_validated;
