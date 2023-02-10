import Caching from "assets/js/classes/Caching";
import empty from "assets/js/functions/empty";
import cache_config from "assets/js/requests/cache_config";

let is_loading = false;

const get_cache = async (name) => {
  if (is_loading) return;
  is_loading = true;
  let cached_data = Caching.get_cache(name);
  if (empty(cached_data)) {
    await cache_config();
    cached_data = Caching.get_cache(name);
  }
  is_loading = false;
  return cached_data;
};

export default get_cache;
