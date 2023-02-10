import { is_phone_validated } from "./phone";
import { defineRule } from "vee-validate";
import is_email_validated from "./email";
import is_melicode_validated from "./melicode";
import { is_numeric } from "./numeric";
import is_sheba_validated from "@/assets/js/functions/validator/sheba";
import is_sheba_resalat from "@/assets/js/functions/validator/is_sheba_resalat";

function allow_if_empty(value) {
  if (!value || !value.length) {
    return true;
  }
}

defineRule("required", value => {
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
    return "شماره شبا بانک رسالت قابل قبول نیست.";
  }
  return true;
});

