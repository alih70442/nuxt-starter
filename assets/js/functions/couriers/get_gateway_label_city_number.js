import { CITY_TEHRAN } from "@/assets/js/consts/cities.const.js";
import { PROVINCE_TEHRAN } from "@/assets/js/consts/provinces.const.js";

const GATEWAY_LABEL_CITY_NUMBERS = {
  1: 7,
  2: 8,
  3: 32,
  4: 30,
  5: 31,
  6: 14,
  7: 26,
  8: 11,
  9: 22,
  10: 3,
  11: 28,
  12: 25,
  13: 29,
  14: 5,
  15: 2,
  16: 4,
  17: 13,
  18: 6,
  19: 1,
  20: 17,
  21: 20,
  22: 16,
  23: 23,
  24: 24,
  25: 9,
  26: 18,
  27: 27,
  28: 19,
  29: 12,
  30: 15,
  31: 21,
};

const get_gateway_label_city_number = (province_id, city_id, postal_code) => {

  if (province_id === PROVINCE_TEHRAN && city_id === CITY_TEHRAN) {
    return 10;
  }

  const found_number = GATEWAY_LABEL_CITY_NUMBERS[province_id];

  return found_number ?? 10;
};

export default get_gateway_label_city_number;