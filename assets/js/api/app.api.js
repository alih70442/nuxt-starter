import {axiosClient} from "../network/axios_init";
import {ROUTE_CALCULATOR, ROUTE_CONFIG, ROUTE_TRACKING, ROUTE_VERSION} from "assets/js/consts/routes.consts";
import make_query_params from "assets/js/functions/route/make_query_params";

function fetch_version(){
  return axiosClient.get(ROUTE_VERSION).then(resp => {
    return resp.data.data.config;
  });
}

function fetch_config(){
  return axiosClient.get(ROUTE_CONFIG);
}

function calculate_price(params){
  return axiosClient.post(ROUTE_CALCULATOR, params);
}

function track_code(params){
  return axiosClient.get(ROUTE_TRACKING + make_query_params(params));
}

export {
  fetch_version,
  fetch_config,
  calculate_price,
  track_code,
};
