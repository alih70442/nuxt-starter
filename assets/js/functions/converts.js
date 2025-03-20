Number.prototype.currency = function (num, format = 3, after_dot = 0) {
  var re = "\\d(?=(\\d{" + (format || 3) + "})+" + (num > 0 ? "\\." : "$") + ")";
  let output = this.toFixed(Math.max(after_dot, ~~num)).replace(new RegExp(re, "g"), "$&,");
  return output.replace(/(\.0+)$/, "");
};

function format_currency(num, format = 3, after_dot = 1) {
  if (!num) return num;
  return parseFloat(num).currency(after_dot, format);
}

function convert_phone_number_to_98(phone_number) {
  if (phone_number.charAt(0) === "0") {
    return "+98" + phone_number.substring(1);
  } else {
    return phone_number;
  }
}

function convert_to_kilogram(gram) {
  return gram / 1000;
}

function convert_to_toman(rial) {
  rial = rial.toString();
  return rial.substring(0, rial.length - 1);
}

export {
  format_currency,
  convert_to_kilogram,
  convert_to_toman,
  convert_phone_number_to_98,
};
