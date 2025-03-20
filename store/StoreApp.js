import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "App",
  state: () => ({
    is_cart_loaded: false,
    cart: [],
    active_store_slug: null,
    promises: [],
  }),
  getters: {
    get_statistics(state) {
      return state.statistics;
    },
  },
  actions: {

    add_promise(promise_name, promise) {
      this.promises.push({
        key: promise_name,
        promise,
      });
    },
    run_after_promise(promise_name) {
      const found_promise = this.promises.find(promise => promise.key === promise_name);

      if (!found_promise) return;
      if (!found_promise.promise) return;

      return Promise.all([found_promise.promise]);
    },
  },
});
