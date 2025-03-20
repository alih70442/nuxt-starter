import { ROUTE_CITY_INDEX } from "@/assets/js/consts/publicRoutes.consts.js";
import { axios_get } from "@/assets/js/functions/axios_helpers.js";

const index_cities = (params) => axios_get(ROUTE_CITY_INDEX, params);

export {
  index_cities,
};
