import { useUserStore } from "@/stores/StoreUser";
import mapRoutes from "@/assets/js/mappers/mapRoutes";
import { get_active_role, set_active_role } from "@/assets/js/helpers/get_active_role";
import { useAppStore } from "@/stores/StoreApp.js";
import get_response_data from "@/assets/js/helpers/get_response_data.js";
import { PROMISE_USER } from "@/assets/js/consts/promiseKeys.const.js";
import { show_user } from "@/assets/js/api/user.api.js";
import RoleEnum from "@/assets/js/consts/roles.const";

const refresh_user = () => {
  const promise = show_user().then((rs) => {
    const user_data = get_response_data(rs);

    const userStore = useUserStore();
    if (user_data?.is_supplier) {
      userStore.set_routes(mapRoutes(RoleEnum.supplier));
      set_active_role(RoleEnum.supplier);
    } else {
      userStore.set_routes(mapRoutes(RoleEnum.dropShipper));
      set_active_role(RoleEnum.dropShipper);
    }

    if (userStore.$id !== get_active_role()) {
      window.location.reload();
    }

    userStore.set(user_data);
    userStore.set_loaded();

    return user_data;
  }).catch(() => {
    return false;
  });

  useAppStore().add_promise(PROMISE_USER, promise);

  return promise;
};

export {
  refresh_user,
};
