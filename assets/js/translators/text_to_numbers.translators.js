import to_latin_numbers from "~/assets/js/translators/to_latin_numbers.translators";

function text_to_numbers(text){
  return to_latin_numbers(text.replace(/[^0-9|^۱۲۳۴۵۶۷۸۹۰]/g, ""));
}

export default text_to_numbers;
