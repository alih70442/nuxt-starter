import text_to_numbers from "@/assets/js/translators/text_to_numbers.translators.js";

const national_code = {
  label: "کد ملی",
  rules: "required|melicode",
  maxlength: 10,
  inputmode: "numeric",
  translators: [text_to_numbers],
};

export default national_code;