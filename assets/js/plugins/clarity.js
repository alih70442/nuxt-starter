import Clarity from "@microsoft/clarity";
import is_dev from "@/assets/js/functions/is_dev";

const init_clarity = () => {

  if (!is_dev()) {
    Clarity.init(import.meta.env.VITE_CLARITY_PROJECT_ID);
  }
};

const set_clarity_user = (hash_id) => {

  Clarity.identify(hash_id);
};

export {
  init_clarity,
  set_clarity_user,
};
