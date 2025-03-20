import { computed } from "vue";

const computed_prop = (props, key, default_value) => {
  return computed(() => {
    return props[key] || props.input?.[key] || default_value;
  });
};

export default computed_prop;
