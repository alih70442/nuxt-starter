import couriersWithPickup from "@/assets/js/consts/couriersWithPickup";

function is_courier_pickup_required(courier_id) {
  return couriersWithPickup.includes(courier_id);
}

export default is_courier_pickup_required;
