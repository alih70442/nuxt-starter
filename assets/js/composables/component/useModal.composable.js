import { ref } from "vue";

const useModal = (options) => {
  options = Object.assign({
    onHide: () => {
    },
    onShow: () => {
    },
  }, options);

  const ref_modal = ref();

  const hide = (...params) => {
    ref_modal.value.hide();
    options.onHide(...params);
  };

  const show = (...params) => {
    ref_modal.value.show();
    options.onShow(...params);
  };

  return {
    ref_modal,
    hide,
    show,
  };
};

export default useModal;
