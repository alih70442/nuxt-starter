import { computed } from "vue";
import get_unique_id from "@/assets/js/functions/get_unique_id";
import get_id from "@/assets/js/functions/id";
import computed_prop_function from "@/assets/js/helpers/computed_prop";

const useInput = (props, emits) => {
  const computed_prop = (key, default_value) => {
    return computed_prop_function(props, key, default_value);
  };

  const input_id = computed_prop("id", get_id(true));

  const input_rules = computed_prop("rules", "");

  const input_name = computed_prop("name", get_unique_id());

  const input_label = computed_prop("label", "");

  const input_helpText = computed_prop("helpText", "");

  const input_disabled = computed_prop("disabled", false);

  const is_required = computed(() => {
    return input_rules.value.includes("required");
  });

  return {
    is_required,
    input_id,
    input_name,
    input_label,
    input_helpText,
    input_disabled,
    computed_prop,
  };
};

export default useInput;
