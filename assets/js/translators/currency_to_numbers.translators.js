import to_latin_numbers from "@/assets/js/translators/to_latin_numbers.translators";

function currency_to_numbers(value) {
  if (!value) return value;
  return +to_latin_numbers(value?.toString().replace(/,/g, ""));
}

export default currency_to_numbers;
