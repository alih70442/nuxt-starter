import { axiosClient } from "~/assets/js/network/axios_init";
import make_query_params from "~/assets/js/functions/route/make_query_params";
import { useCacheStore } from "~/store/StoreCache.js";
import { vsprintf } from "sprintf-js";
import omitBy from "lodash/omitBy";
import pickBy from "lodash/pickBy";

const handle_options = (options) => {
  return Object.assign({
    caching: {
      enable: false,
      name: null,
      purges: [],
    },
  }, options);
};

const prepare_route_url = (route, params) => {
  const params_sprintf = pickBy(params, (_, key) => {
    return key.startsWith("%");
  });

  const params_sprintf_values = Object.values(params_sprintf);

  return vsprintf(route, params_sprintf_values);
};

const append_queries = (route, params) => {
  const filtered_params = omitBy(params, (_, key) => {
    return key.startsWith("%") || key.startsWith("__");
  });

  return route + make_query_params(filtered_params);
};

const axios_get = (route, params = {}, options = {}) => {
  options = handle_options(options);
  route = prepare_route_url(route, params);
  route = append_queries(route, params);

  const cacheStore = useCacheStore();

  cacheStore.purge_caches(options.caching.purges);

  if (options.caching.enable) {
    return cacheStore.handle_cache(options.caching.name, () => axiosClient.get(route, {
      __silent: params.__silent,
    }));
  }

  return axiosClient.get(route, {
    __silent: params.__silent,
  });
};

const axios_patch = (route, params = {}, options = {}) => {
  options = handle_options(options);
  route = prepare_route_url(route, params);

  useCacheStore().purge_caches(options.caching.purges);

  return axiosClient.patch(route, params, {
    __silent: params.__silent,
  });
};

const axios_post = (route, params = {}, options = {}) => {
  options = handle_options(options);
  route = prepare_route_url(route, params);

  useCacheStore().purge_caches(options.caching.purges);

  return axiosClient.post(route, params, {
    ...options,
    __silent: params.__silent,
  });
};

const axios_put = (route, params = {}, options = {}) => {
  options = handle_options(options);
  route = prepare_route_url(route, params);
  console.log(params);

  useCacheStore().purge_caches(options.caching.purges);

  return axiosClient.put(route, params, {
    __silent: params.__silent,
  });
};

const axios_delete = (route, params = {}, options = {}) => {
  options = handle_options(options);
  route = prepare_route_url(route, params);
  route = append_queries(route, params);

  useCacheStore().purge_caches(options.caching.purges);

  return axiosClient.delete(route, {
    __silent: params.__silent,
  });
};

export {
  axios_get,
  axios_patch,
  axios_put,
  axios_post,
  axios_delete,
};
