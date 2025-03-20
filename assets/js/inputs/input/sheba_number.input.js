import text_to_numbers from "@/assets/js/translators/text_to_numbers.translators.js";

const sheba_number = {
  label: "شماره شبا",
  rules: "sheba|shebaNotBlubank",
  suffix: "IR",
  maxlength: 24,
  inputmode: "numeric",
  translators: [text_to_numbers],
  helpText: "شماره شبا «بانک رسالت و بلوبانک» قابل قبول <u>نیست<u/>.",
};

export default sheba_number;
