import { KEY_ACTIVE_ROLE } from "@/assets/js/consts/storageKeys.const";
import { DEFAULT_USER_ROLE } from "@/assets/js/consts/AppOptions.const.js";
import { SimpleStorage } from "@/assets/js/classes/Storage.js";

const get_active_role = () => {
  return SimpleStorage.getItem(KEY_ACTIVE_ROLE) ?? DEFAULT_USER_ROLE;
};

const set_active_role = (new_role) => {
  return SimpleStorage.setItem(KEY_ACTIVE_ROLE, new_role);
};

export {
  get_active_role,
  set_active_role,
};
