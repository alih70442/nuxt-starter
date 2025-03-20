function is_persian_word(value) {
  return /^[\u0600-\u06FF\u0698\u067E\u0686\u06AF\s]+$/g.test(value);
}

export default is_persian_word;
