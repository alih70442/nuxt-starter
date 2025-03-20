import { defineStore } from "pinia";

export const useCacheStore = defineStore({
  id: "Cache",
  state: () => ({
    data: {},
    in_progress_requests: {},
  }),
  getters: {
    get_cache(state) {
      return state.status;
    },
  },
  actions: {
    add_in_progress_request(cache_name, request) {
      this.in_progress_requests[cache_name] = request;
    },
    remove_in_progress_request(cache_name) {
      delete this.in_progress_requests[cache_name];
    },
    is_request_in_progress(cache_name) {
      return cache_name in this.in_progress_requests;
    },
    get_in_progress_request(cache_name) {
      return this.in_progress_requests[cache_name];
    },
    async handle_cache(cache_name, request_handler) {

      if (cache_name in this.data) {
        return Promise.resolve(this.data[cache_name]);
      }

      if (this.is_request_in_progress(cache_name)) {
        return this.get_in_progress_request(cache_name);
      }

      try {
        const promise = new Promise(async (resolve, reject) => {
          const rs = await request_handler();

          this.data[cache_name] = {
            data: rs.data,
          };

          resolve(rs);

          this.remove_in_progress_request(cache_name);
        });

        this.add_in_progress_request(cache_name, promise);

        return await promise;
      } catch (err) {
        throw err;
      }
    },
    purge_caches(cache_names) {

      if (!Array.isArray(cache_names)) {
        cache_names = [cache_names];
      }

      const filtered_cache_names = Object.keys(this.data).filter(cache => cache_names.find(c_name => cache.includes(c_name)));

      for (const cache_name of filtered_cache_names) {
        delete this.data[cache_name];
      }
    },
    purge_all_caches() {
      this.data = Object.create(null);
    },
  },
});
