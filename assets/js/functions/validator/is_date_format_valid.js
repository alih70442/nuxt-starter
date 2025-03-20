import to_latin_numbers from "@/assets/js/translators/to_latin_numbers.translators";
import jalali from "jalaali-js";

function is_date_format_valid(value) {
  value = to_latin_numbers(value);
  return /\d\d\d\d\/(\d\d|\d)\/(\d\d|\d)/g.test(value);
}

function is_persian_date_valid(value) {
  if (value.length === 10) return false;

  const year = parseInt(value?.length > 3 ? value.slice(0, 4) : "");
  const month = parseInt(value?.length > 6 ? value.slice(5, 7) : "");
  const day = parseInt(value?.length > 9 ? value.slice(8, 10) : "");

  return jalali.isValidJalaaliDate(year, month, day);
}

export { is_date_format_valid, is_persian_date_valid };
