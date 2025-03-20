import { ElMessageBox } from "element-plus";

const usePrompt = () => {

  const create = (title, message, options) => {
    return ElMessageBox.prompt(message, title, {
      confirmButtonText: "ثبت",
      cancelButtonText: "بیخیال",
      ...(options.inputPattern && { inputPattern: options.inputPattern }),
      inputErrorMessage: "ورودی مشکل داره",
    });
  };

  return {
    create,
  };
};

export default usePrompt;
