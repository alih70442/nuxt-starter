import empty from "@/assets/js/functions/empty";

function is_order_complete(order) {
  return [
    order.recipient_name,
    order.recipient_city,
    order.recipient_postal_code,
    order.recipient_mobile,
    order.recipient_address,
    order.sender_city,
    order.sender_postal_code,
    order.sender_mobile,
    order.sender_address,
    order.package_type,
    order.product_type.id,
    order.weight,
    order.value
  ].every(value => !empty(value));
}

export default is_order_complete;
