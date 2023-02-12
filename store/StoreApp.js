import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "App",
  state: () => ({
    status: "RUNNING", // RUNNING | NO_INTERNET | UPDATING | SERVER_DOWN
    modals_count: 0,
    ref_confirm: null,
  }),
  getters: {},
  actions: {
    set_confirm(ref) {
      this.ref_confirm = ref;
    },
    async create_confirm(options) {
      return this.ref_confirm.create(options);
    },
    increment_modals_count() {
      this.modals_count++;
      if (this.modals_count > 0)
        document.body.style.overflow = "hidden";
    },
    decrement_modals_count() {
      this.modals_count--;
      if (this.modals_count <= 0)
        document.body.style.overflow = "auto";
    },
  },
});
