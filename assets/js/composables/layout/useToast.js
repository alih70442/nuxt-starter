import { ElMessage } from "element-plus";

const CONFIGS = {
  duration: 4000,
  showClose: false,
};

const useToast = () => {
  const handler = ElMessage ?? window.$message;

  const create_warning = (message) => {
    handler({
      ...CONFIGS,
      type: "warning",
      message,
    });
  };

  const create_info = (message) => {
    handler({
      ...CONFIGS,
      type: "info",
      message,
    });
  };

  const create_danger = (message) => {
    handler({
      ...CONFIGS,
      type: "error",
      message,
    });
  };

  const create_success = (message) => {
    handler({
      ...CONFIGS,
      type: "success",
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

export default useToast;
