function text_to_latin(value) {
  return value.toString().replace(/[^a-zA-Z0-9۱۲۳۴۵۶۷۸۹۰()*_\-!#$%^&*,."\'\][]*/g, "");
}

export default text_to_latin;
