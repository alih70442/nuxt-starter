import is_dev from "@/assets/js/functions/is_dev.js";

const log = (log_data) => {
  if (is_dev()) return;

  console.log(log_data);
};

export default log;
