import empty from "@/assets/js/functions/empty";

function is_preorder_complete(order) {
  return [
    order.location,
    order.recipient_name,
    order.recipient_city,
    order.recipient_postal_code,
    order.recipient_mobile,
    order.recipient_address,
    order.product_type.id,
    order.weight,
    order.value
  ].every(value => !empty(value));
}

export default is_preorder_complete;
