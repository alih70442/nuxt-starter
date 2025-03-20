import { ROUTE_ORDER_SHOW_BY_MOBILE, ROUTE_ORDER_SHOW_BY_NUMBER, ROUTE_ORDER_STORE } from "@/assets/js/consts/publicRoutes.consts.js";
import { axios_get, axios_post } from "assets/js/functions/axios_helpers.js";

const store_order = (params) => axios_post(ROUTE_ORDER_STORE, params);

const show_order_by_number = (params) => axios_get(ROUTE_ORDER_SHOW_BY_NUMBER, params);

const show_orders_by_mobile = (params) => axios_get(ROUTE_ORDER_SHOW_BY_MOBILE, params);

export {
  store_order,
  show_order_by_number,
  show_orders_by_mobile,
};
