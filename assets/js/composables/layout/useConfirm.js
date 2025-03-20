import { ElMessageBox } from "element-plus";

const useConfirm = () => {

  const create = (title = "آیا مطمئنید؟", message = "آیا از انجام این کار مطمئن هستید؟") => {
    return ElMessageBox.confirm(
      title,
      message,
      {
        confirmButtonText: "مطمئنم",
        cancelButtonText: "منصرف شدم",
        type: "warning",
      },
    ).catch(() => {

      return false;
    });
  };

  return {
    create,
  };
};

export default useConfirm;
