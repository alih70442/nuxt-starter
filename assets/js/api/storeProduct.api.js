import { ROUTE_STORE_PRODUCT_INDEX } from "@/assets/js/consts/publicRoutes.consts.js";
import { axios_get } from "@/assets/js/functions/axios_helpers.js";

const index_store_products = (params) => axios_get(ROUTE_STORE_PRODUCT_INDEX, params);

export {
  index_store_products,
};
