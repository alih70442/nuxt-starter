import { onMounted } from "vue";
import cloneDeep from "lodash/cloneDeep";

const useSaveInputs = (name, inputs_obj_ref, options = {}) => {
  options = Object.assign({
    exclude: [],
  }, options);

  const structure = cloneDeep(inputs_obj_ref.value);

  const restore_inputs = () => {
    try {
      const saved_data = JSON.parse(localStorage.getItem(name));

      if (saved_data) {
        for (const [key, input] of Object.entries(saved_data)) {
          if (options["exclude"].includes(key)) continue;

          inputs_obj_ref.value[key].value = input.value;
        }
      }
    } catch (error) {
      console.log("useSaveInputs: ", error);
      save_inputs();
    }
  };

  const save_inputs = () => {
    localStorage.setItem(name, JSON.stringify(inputs_obj_ref.value));
  };

  onMounted(() => {
    restore_inputs();
  });

  return {
    restore_inputs,
    save_inputs,
  };
};

export default useSaveInputs;
