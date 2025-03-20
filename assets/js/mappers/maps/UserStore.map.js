import empty from "@/assets/js/functions/empty.js";
import get_response_data from "@/assets/js/helpers/get_response_data.js";
import RoleEnum from "@/assets/js/consts/roles.const";

const USER_STORE_DROP_SHIPPER = {
  id: RoleEnum.dropShipper,
  state: () => ({
    loaded: false,
    data: {},
    routes: {},
  }),
  getters: {
    get_data(state) {
      return state.data;
    },
    get_routes(state) {
      return state.routes;
    },
    get_stores() {
      return this.get_data.stores ?? [];
    },
    is_user_loaded(state) {
      if (state.data === undefined) return false;
      return Boolean(Object.keys(state.data).length && Object.keys(state.routes).length);
    },
    is_information_completed() {
      const necessary_fields = [
        this.$state.data.name,
        this.$state.data.national_code,
      ];
      return necessary_fields.every(field => !empty(field));
    },
  },
  actions: {
    is_loaded() {
      return this.$state.loaded;
    },
    set_loaded() {
      this.$state.isLoaded = true;
    },
    get() {
      return this.$state.data;
    },
    set(data) {
      this.$state.data = data;
    },
    update(data) {
      Object.assign(this.$state.data, data);
    },
    set_routes(routes) {
      this.$state.routes = routes;
    },
    make_empty() {
      this.set({});
      this.set_routes({});
    },
    update_balance() {
      fetch_balance().then(rs => {
        const data = get_response_data(rs);

        this.$state.data.financial = data.financial;
      });
    },
  },
};

const USER_STORE_SUPPLIER = {
  ...USER_STORE_DROP_SHIPPER,
  id: RoleEnum.supplier,
};

export {
  USER_STORE_DROP_SHIPPER,
  USER_STORE_SUPPLIER,
};
