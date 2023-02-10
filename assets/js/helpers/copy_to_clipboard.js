import copy_clipboard from "assets/js/functions/copy_clipboard";
import useToastsStore from "@/store/StoreToasts";

const copy_to_clipboard = (text) => {
  const is_copied = copy_clipboard(text);
  if (is_copied)
    useToastsStore().create_success("کپی شد.");
  else
    useToastsStore().create_danger("مشکلی پیش آمده است.");
};

export default copy_to_clipboard;
