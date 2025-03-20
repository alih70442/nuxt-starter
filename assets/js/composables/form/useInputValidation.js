import {watch, toRef} from "vue";
import {useField} from "vee-validate";

const useInput = (input_name, props) => {
  const {
    value: inputValue,
    errorMessage,
    errors,
    handleBlur,
    handleChange,
    resetField,
  } = useField(input_name, props.input?.rules, {
    validateOnMount: false,
    initialValue: props.modelValue,
    valueProp: props.modelValue,
    validateOnValueUpdate: true,
  });

  const modelValue = toRef(props, "modelValue");

  watch(modelValue, new_val => {
    inputValue.value = new_val;
  });

  return {
    errorMessage,
    errors,
    modelValue,
    inputValue,
    handleBlur,
    handleChange,
    resetField,
  };
};

export default useInput;
