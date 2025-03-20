import { COURIER_TIPAX } from "@/assets/js/consts/couriers.const";

function is_tipax(courier_id) {
  return courier_id == COURIER_TIPAX;
}

export default is_tipax;
