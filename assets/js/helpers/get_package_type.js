import get_cache from "@/assets/js/requests/get_cache";

async function get_package_type(package_id) {
  const types = await get_cache("package_types");
  return types.find(type => type.id == package_id);
}

export default get_package_type;
