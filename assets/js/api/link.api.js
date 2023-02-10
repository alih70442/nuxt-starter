import {axiosClient} from "../network/axios_init";
import {
  ROUTE_CONFIG,
  ROUTE_LINK_SHOP,
} from "assets/js/consts/routes.consts";

function show_shop(params){
  return axiosClient.get(ROUTE_LINK_SHOP + `/${ params.id }`);
}

export {
  show_shop,
};
