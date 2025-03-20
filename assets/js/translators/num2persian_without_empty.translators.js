import empty from "@/assets/js/functions/empty";
import Num2persian from "num2persian";

function num2persian_without_empty(num) {
  if (!empty(num)) return Num2persian(num);
  return "";
}

export default num2persian_without_empty;
