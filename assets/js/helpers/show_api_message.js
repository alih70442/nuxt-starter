import empty from "assets/js/functions/empty";
import useToastsStore from "../../../store/StoreToasts";

function show_api_message(rs) {
  const data = rs.data;

  if (empty(data.message)) return;

  const toast_type = data.result ? "success" : "danger";

  if (Array.isArray(data.message)) {
    for (const message of data.message) {
      if (message !== "")
        useToastsStore().create({
          type: toast_type,
          text: message
        });
    }
  } else if (typeof (data.message) === "string") {
    if (data.message !== "")
      useToastsStore().create({
        type: toast_type,
        text: data.message
      });
  } else {
    for (const message of Object.values(data.message)) {
      if (message[0] !== "")
        useToastsStore().create({
          type: toast_type,
          text: message[0]
        });
    }
  }
}

export default show_api_message;
