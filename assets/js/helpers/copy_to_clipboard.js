import copy_clipboard from "@/assets/js/functions/copy_clipboard";
import useToast from "@/assets/js/composables/layout/useToast.js";

const copy_to_clipboard = (text, message = "کپی شد.") => {
  const is_copied = copy_clipboard(text);
  if (is_copied)
    useToast().create_success(message);
  else
    useToast().create_danger("مشکلی پیش آمده است.");
};

export default copy_to_clipboard;
