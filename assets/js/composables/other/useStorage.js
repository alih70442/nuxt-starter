import { useUserStore } from "@/stores/StoreUser.js";
import { SimpleStorage } from "@/assets/js/classes/Storage.js";

const useStorage = () => {

  const set_data = (key, data) => {
    const userStore = useUserStore();
    const user_hash_id = userStore.get_data?.hash_id;

    if (user_hash_id) {
      key += "-" + user_hash_id;
    }

    SimpleStorage.setItem(key, data);
  };

  const get_data = (key) => {
    const userStore = useUserStore();
    const user_hash_id = userStore.get_data?.hash_id;

    const simple_value = SimpleStorage.getItem(key);

    if (user_hash_id) {
      key += "-" + user_hash_id;
    }

    const exact_value = SimpleStorage.getItem(key);

    return exact_value ?? simple_value;
  };

  const remove_data = (key) => {
    const userStore = useUserStore();
    const user_hash_id = userStore.get_data?.hash_id;

    if (user_hash_id) {
      key += "-" + user_hash_id;
    }

    SimpleStorage.removeItem(key);
  };

  return {
    set_data,
    get_data,
    remove_data,
  };
};

export default useStorage;
