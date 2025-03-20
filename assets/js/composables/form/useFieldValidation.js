import { ref } from "vue";
import empty from "@/assets/js/functions/empty";
import get_unique_id from "@/assets/js/functions/get_unique_id";
import { useField } from "vee-validate";

function useFieldValidation(rules, modelValue, options = {}) {
  options = Object.assign({}, options);

  let name = ref(options.name);
  if (empty(name.value)) {
    name.value = get_unique_id();
  }

  const {
    value: inputValue,
    errorMessage,
    handleBlur,
    errors,
    handleChange,
    resetField,
  } = useField(name, rules, {
    initialValue: modelValue?.toString(),
    valueProp: modelValue,
  });

  return {
    errorMessage,
    handleBlur,
    errors,
    handleChange,
    resetField,
  };
}

export default useFieldValidation;
