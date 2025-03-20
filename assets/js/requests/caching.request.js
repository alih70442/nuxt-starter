import Caching from "@/assets/js/classes/Caching";
import { fetch_config } from "@/assets/js/api/app.api";
import get_response_data from "@/assets/js/helpers/get_response_data.js";
import { useAppStore } from "@/stores/StoreApp.js";
import { PROMISE_CONFIG } from "@/assets/js/consts/promiseKeys.const.js";
import empty from "@/assets/js/functions/empty.js";

const CACHE_PREFIX = "cache-";

const cache_config = () => {
  const promise = fetch_config().then(rs => {
    const config_data = get_response_data(rs);

    Object.entries(config_data).forEach(([key, value]) => {
      Caching.cache_now(CACHE_PREFIX + key, value);
    });
  });

  useAppStore().add_promise(PROMISE_CONFIG, promise);

  return promise;
};

const get_cache = async (name) => {
  await useAppStore().run_after_promise(PROMISE_CONFIG);

  let cached_data = Caching.get_cache(CACHE_PREFIX + name);

  if (empty(cached_data)) {
    await cache_config();

    cached_data = Caching.get_cache(CACHE_PREFIX + name);
  }

  return cached_data;
};

export {
  cache_config,
  get_cache,
};
