import { USER_STORE_DROP_SHIPPER, USER_STORE_SUPPLIER } from "@/assets/js/mappers/maps/UserStore.map.js";
import RoleEnum from "@/assets/js/consts/roles.const";

const userStoreMapper = {
  [RoleEnum.dropShipper]: USER_STORE_DROP_SHIPPER,
  [RoleEnum.supplier]: USER_STORE_SUPPLIER,
};

function mapUserStore(user_role) {
  return userStoreMapper[user_role];
}

export default mapUserStore;
