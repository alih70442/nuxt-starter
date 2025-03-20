import to_latin_numbers from "@/assets/js/translators/to_latin_numbers.translators";

function is_persian_date_valid(value) {
  value = to_latin_numbers(value);
  return /1[3-4]\d\d\/(1[0-2]|[1-9]|0[1-9])\/(0[1-9]|[1-2]\d|3[0-1]|[1-9])($)/g.test(value);
}

export { is_persian_date_valid };
