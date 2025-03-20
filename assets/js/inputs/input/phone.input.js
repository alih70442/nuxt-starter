import text_to_numbers from "@/assets/js/translators/text_to_numbers.translators.js";

const phone = {
  label: "تلفن",
  rules: "required|phone",
  placeholder: "...0",
  translators: [text_to_numbers],
  maxlength: 11,
  inputmode: "numeric",
};

export default phone;