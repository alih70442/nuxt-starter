import { createPopper } from "@popperjs/core";

const usePopper = (ref_container, ref_float, options = {}) => {
  options = Object.assign({
    placement: "top",
    strategy: "fixed",
    offset: [0, 0],
  }, options);

  let popper = null;

  const show_popper = () => {
    if (!popper)
      popper = init_popper();

    ref_float.value?.setAttribute("data-show", "");

    popper?.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: "eventListeners", enabled: true },
      ],
    }));
    popper?.update();
  };

  const hide_popper = () => {
    ref_float.value?.removeAttribute("data-show");

    if (!popper) return;

    popper?.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: "eventListeners", enabled: false },
      ],
    }));
  };

  const init_popper = () => {
    return createPopper(ref_container.value, ref_float.value, {
      placement: options.placement,
      strategy: options.strategy,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: options.offset,
          },
        },
      ],
    });
  };

  return {
    show_popper,
    hide_popper,
  };
};

export default usePopper;
