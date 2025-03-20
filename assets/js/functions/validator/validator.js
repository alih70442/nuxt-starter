import { is_phone_validated } from "./phone";
import { defineRule } from "vee-validate";
import is_email_validated from "./email";
import is_melicode_validated from "./melicode";
import { is_numeric } from "./numeric";
import is_sheba_validated from "@/assets/js/functions/validator/sheba";
import { is_latin_word } from "@/assets/js/functions/validator/is_latin_word";
import is_sheba_resalat from "@/assets/js/functions/validator/is_sheba_resalat";
import { is_date_format_valid, is_persian_date_valid } from "@/assets/js/functions/validator/is_date_format_valid.js";
import is_mobile_validated from "@/assets/js/functions/validator/mobile.js";
import is_persian_word from "@/assets/js/functions/validator/is_persian_word.js";
import isNil from "lodash/isNil";
import is_sheba_blubank from "@/assets/js/functions/validator/is_sheba_blubank.js";

function allow_if_empty(value) {
  return isNil(value)
    || value === ""
    || (Array.isArray(value) && !value.length);
}

defineRule("required", value => {
  if (typeof value == "boolean") return true;
  if (typeof value == "number") return true;
  if (value instanceof File) return true;

  if (!value || !value.length) {
    return "این فیلد ضروری است";
  }
  return true;
});

defineRule("checked", value => {
  if (value === false) {
    return "این گزینه باید انتخاب شود";
  }
  return true;
});

defineRule("email", value => {
  if (allow_if_empty(value)) return true;

  if (!is_email_validated(value)) {
    return "فرمت ایمیل اشتباه است";
  }
  return true;
});


defineRule("melicode", value => {
  if (allow_if_empty(value)) return true;

  if (value.length !== 10 || !is_melicode_validated(value)) {
    return "فرمت کد ملی اشتباه است";
  }
  return true;
});

defineRule("sheba", value => {
  if (allow_if_empty(value)) return true;

  if (!is_sheba_validated(value)) {
    return "فرمت شماره شبا اشتباه است";
  }
  return true;
});

defineRule("phone", value => {
  if (allow_if_empty(value)) return true;

  if (!is_phone_validated(value)) {
    return "فرمت شماره تلفن اشتباه است";
  }

  return true;
});

defineRule("mobile", value => {
  if (allow_if_empty(value)) return true;

  if (!is_mobile_validated(value)) {
    return "فرمت شماره همراه اشتباه است";
  }

  return true;
});

defineRule("length", (value, [limit]) => {
  if (allow_if_empty(value)) return true;
  if (value.length !== parseInt(limit)) {
    return `مقدار این گزینه باید ${limit} رقم باشد`;
  }
  return true;
});

defineRule("minLength", (value, [limit]) => {
  if (allow_if_empty(value)) return true;
  if (value.length < parseInt(limit)) {
    return `تعداد باید ${limit} عدد یا بیشتر باشد`;
  }
  return true;
});

defineRule("minCharLength", (value, [limit]) => {
  if (allow_if_empty(value)) return true;
  if (value.length < parseInt(limit)) {
    return `تعداد کاراکترها باید ${limit} عدد یا بیشتر باشد`;
  }
  return true;
});

defineRule("biggerThan", (value, [limit]) => {
  if (allow_if_empty(value)) return true;
  if (value <= parseInt(limit)) {
    return `باید بیشتر از ${limit} باشد`;
  }
  return true;
});

defineRule("lessThan", (value, [limit]) => {
  if (allow_if_empty(value)) return true;
  if (value >= parseInt(limit)) {
    return `باید کمتر از ${limit} باشد`;
  }
  return true;
});

defineRule("equalOrBiggerThan", (value, [limit]) => {
  if (allow_if_empty(value)) return true;
  if (value < parseInt(limit)) {
    return "باید " + limit + " یا بیشتر باشد";
  }
  return true;
});

defineRule("equalOrLessThan", (value, [limit]) => {
  if (allow_if_empty(value)) return true;
  if (value > parseInt(limit)) {
    return "باید " + limit + " یا کمتر باشد";
  }
  return true;
});

defineRule("numeric", value => {
  if (allow_if_empty(value)) return true;

  if (!is_numeric(value)) {
    return "مقدار این گزینه باید عددی باشد";
  }
  return true;
});

defineRule("shebaNotResalat", value => {
  if (allow_if_empty(value)) return true;

  if (is_sheba_resalat(value)) {
    return "شماره شبا بانک رسالت قابل قبول نیست";
  }
  return true;
});

defineRule("shebaNotBlubank", value => {
  if (allow_if_empty(value)) return true;

  if (is_sheba_blubank(value)) {
    return "شماره شبا بلوبانک قابل قبول نیست";
  }
  return true;
});

defineRule("latin_word", value => {
  if (allow_if_empty(value)) return true;

  if (!is_latin_word(value)) {
    return "فرمت این فیلد باید از حروف انگلیسی و اعداد باشد";
  }
  return true;
});

defineRule("persian_word", value => {
  if (allow_if_empty(value)) return true;

  if (!is_persian_word(value)) {
    return "تنها حروف فارسی قابل قبول هستند";
  }
  return true;
});

defineRule("date_format", value => {
  if (allow_if_empty(value)) return true;

  if (!is_date_format_valid(value)) {
    return "فرمت تاریخ اشتباه است (فرمت صحیح 1401/01/01)";
  }
  return true;
});

defineRule("persian_date", value => {
  if (allow_if_empty(value)) return true;

  if (!is_persian_date_valid(value)) {
    return "تاریخ وارد شده معتبر نمی باشد";
  }
  return true;
});
