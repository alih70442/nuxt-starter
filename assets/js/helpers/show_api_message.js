import empty from "@/assets/js/functions/empty";
import useToast from "@/assets/js/composables/layout/useToast.js";

function show_api_message(rs) {
  const data = rs.data;

  if (empty(data.message)) return;

  const toast_func = data.result ? useToast().create_success : useToast().create_danger;

  if (Array.isArray(data.message)) {
    for (const message of data.message) {
      if (message !== "")
        toast_func(message);
    }
  } else if (typeof (data.message) === "string") {
    if (data.message !== "")
      toast_func(data.message);
  } else {
    for (const message of Object.values(data.message)) {
      if (message[0] !== "")
        toast_func(message[0]);
    }
  }
}

export default show_api_message;
