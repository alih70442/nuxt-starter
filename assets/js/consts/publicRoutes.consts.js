import get_base_url from "assets/js/functions/route/get_base_url.js";

const ROUTE_BASE = get_base_url();

const ROUTE_CITY_INDEX = "city";

const ROUTE_STORE_PRODUCT_INDEX = "store/%s/product";
const ROUTE_STORE_PRODUCT_SHOW = "store/%s/product/%i";

const ROUTE_STORE_PRODUCT_VARIATION_INDEX = "store/%s/product_variation";

const ROUTE_STORE_STORE_SHOW = "store/%s";

const ROUTE_ORDER_STORE = "store/%s/order";
const ROUTE_ORDER_SHOW_BY_NUMBER = "store/%s/order/number/%i";
const ROUTE_ORDER_SHOW_BY_MOBILE = "store/%s/order/user-mobile/%s";

export {
  ROUTE_BASE,
  ROUTE_CITY_INDEX,
  ROUTE_STORE_PRODUCT_INDEX,
  ROUTE_STORE_PRODUCT_SHOW,
  ROUTE_STORE_STORE_SHOW,
  ROUTE_ORDER_STORE,
  ROUTE_STORE_PRODUCT_VARIATION_INDEX,
  ROUTE_ORDER_SHOW_BY_NUMBER,
  ROUTE_ORDER_SHOW_BY_MOBILE,
};
