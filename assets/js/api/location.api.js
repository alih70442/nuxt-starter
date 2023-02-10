import { axiosClient } from "../network/axios_init";
import { ROUTE_LOCATIONS_CITIES } from "../consts/routes.consts";

function fetch_cities() {
  return axiosClient.get(ROUTE_LOCATIONS_CITIES);
}

export {
  fetch_cities,
};
