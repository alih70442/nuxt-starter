import empty from "@/assets/js/functions/empty.js";

function inputs_to_key_value(inputs) {
  const key_values = {};
  Object.entries(inputs).forEach(([key, value]) => {
    if (empty(value.value)) return;

    if (value?.type === "date") {

      key_values["from"] = value.value[0];
      key_values["to"] = value.value[1];
      return;
    }

    key_values[key] = value.value;
  });

  return key_values;
}

export default inputs_to_key_value;
