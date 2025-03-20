import { KEY_NEED_CONFIG } from "@/assets/js/consts/storageKeys.const.js";
import { SimpleStorage } from "@/assets/js/classes/Storage.js";

const is_app_updating = () => {
  return SimpleStorage.getItem(KEY_NEED_CONFIG) === "true";
};

export default is_app_updating;
