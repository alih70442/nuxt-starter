import { ROUTE_CONFIG, ROUTE_VERSION } from "@/assets/js/consts/publicRoutes.consts.js";
import { useAppStore } from "@/stores/StoreApp";
import { axios_get } from "@/assets/js/functions/axios_helpers.js";
import CacheNameEnum from "@/assets/js/consts/CacheName.const.js";

const fetch_config = (params) => axios_get(ROUTE_CONFIG, params, {
  caching: {
    enable: true,
    name: CacheNameEnum.configs,
  },
});

export {
  fetch_config,
};
