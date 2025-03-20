import { defineAsyncComponent } from "vue";

const asyncComponent = (import_func) => {
  return defineAsyncComponent({
    loader: () => import_func(),
    delay: 2000,
  });
};

export default asyncComponent;
