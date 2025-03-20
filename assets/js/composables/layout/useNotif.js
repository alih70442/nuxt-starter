import { ElNotification } from "element-plus";

const CONFIGS = {
  duration: 6000,
  showClose: true,
};

const useNotif = () => {
  const handler = ElNotification ?? window.$notify;

  const create_warning = (title, message) => {
    handler({
      ...CONFIGS,
      type: "warning",
      title,
      message,
    });
  };

  const create_info = (title, message) => {
    handler({
      ...CONFIGS,
      type: "info",
      title,
      message,
    });
  };

  const create_danger = (title, message) => {
    handler({
      ...CONFIGS,
      type: "error",
      title,
      message,
    });
  };

  const create_success = (title, message) => {
    handler({
      ...CONFIGS,
      type: "success",
      title,
      message,
    });
  };

  return {
    create_warning,
    create_info,
    create_danger,
    create_success,
  };
};

export default useNotif;
