import { COURIER_GATEWAY } from "@/assets/js/consts/couriers.const";

function is_gateway(courier_id) {
  return courier_id == COURIER_GATEWAY;
}

export default is_gateway;
