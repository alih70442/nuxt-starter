import { defineStore } from "pinia";

const useToastsStore = defineStore({
  id: "Toasts",
  state: () => ({
    id: 0,
    list: [
      // {
      //     text: 'mmd'
      //     type: 'success'
      // }
    ],
  }),
  getters: {
    toasts_list(state) {
      return state.list;
    },
  },
  actions: {
    create(data) {
      this.id++;
      Object.assign(data, { id: "toast_" + this.id });
      this.list.push(data);
    },
    remove(id) {
      this.list = this.list.filter(toast => toast.id !== id);
    },
    create_success(text) {
      this.create({
        type: "success",
        text: text,
      });
    },
    create_warning(text) {
      this.create({
        type: "warning",
        text: text,
      });
    },
    create_danger(text) {
      this.create({
        type: "danger",
        text: text,
      });
    },
  },
});

export default useToastsStore;
