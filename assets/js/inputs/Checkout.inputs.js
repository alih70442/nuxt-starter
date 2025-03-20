import cloneDeep from "lodash/cloneDeep";
import passwordInput from "@/assets/js/inputs/input/password.input.js";
import mobileInput from "@/assets/js/inputs/input/mobile.input";
import nameInput from "assets/js/inputs/input/name.input.js";
import cityInput from "assets/js/inputs/input/city.input.js";
import postal_codeInput from "assets/js/inputs/input/postal_code.input.js";
import addressInput from "assets/js/inputs/input/address.input.js";

const LoginView = {
  mobile: cloneDeep(mobileInput),
  password: cloneDeep(passwordInput),
  name: cloneDeep(nameInput),
  city_id: cloneDeep(cityInput),
  postal_code: cloneDeep(postal_codeInput),
  address: cloneDeep(addressInput),
  "description": {
    label: "توضیحات تکمیلی",
    placeholder: "بسته‌بندی مناسب ...",
    rules: "",
    type: "textarea",
    autosize: true,
    rows: 6,
  },
};

export default LoginView;
