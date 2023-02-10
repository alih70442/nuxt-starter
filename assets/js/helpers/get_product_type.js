import get_cache from "@/assets/js/requests/get_cache";

async function get_product_type(product_id) {
  const types = await get_cache("product_types");
  return types.find(type => type.id == product_id);
}

export default get_product_type;
