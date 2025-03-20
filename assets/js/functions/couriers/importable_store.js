import IMPORTABLE_STORES from "@/assets/js/consts/importableStores.js";

function is_importable_store(store_type_id) {
  return IMPORTABLE_STORES.includes(+store_type_id);
}

function has_importable_stores(stores) {
  return Boolean(stores.find(store => is_importable_store(store.type?.id)));
}

export {
  is_importable_store,
  has_importable_stores,
};
