import { ROUTE_STORE_STORE_SHOW } from "@/assets/js/consts/publicRoutes.consts.js";
import { axios_get } from "@/assets/js/functions/axios_helpers.js";

const show_store = (params) => axios_get(ROUTE_STORE_STORE_SHOW, params);

export {
  show_store,
};
