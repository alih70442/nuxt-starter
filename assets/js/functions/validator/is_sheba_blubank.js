import is_sheba_saman from "@/assets/js/functions/validator/is_sheba_saman.js";

function is_sheba_blubank(value) {
  return is_sheba_saman(value) && value.startsWith("6118", 6);
}

export default is_sheba_blubank;

