import remove_regex from "@/assets/js/translators/remove_regex.translators";
import to_latin_numbers from "@/assets/js/translators/to_latin_numbers.translators";

function allow_date(value) {
  value = to_latin_numbers(value);
  return remove_regex(value, /[^(\d*|/)]/g);
}

export default allow_date;
