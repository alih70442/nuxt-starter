import { ROUTE_STORE_PRODUCT_INDEX, ROUTE_STORE_PRODUCT_VARIATION_INDEX } from "@/assets/js/consts/publicRoutes.consts.js";
import { axios_get } from "@/assets/js/functions/axios_helpers.js";

const index_product_variations = (params) => axios_get(ROUTE_STORE_PRODUCT_VARIATION_INDEX, params);

export {
  index_product_variations,
};
