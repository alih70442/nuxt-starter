import phoneInput from "@/assets/js/inputs/input/phone.input.js";

const mobile = {
  ...phoneInput,
  label: "موبایل",
  rules: "required|mobile",
  placeholder: "مثلا ۰۹۱۲۳۴۵۶۷۸۹",
};

export default mobile;