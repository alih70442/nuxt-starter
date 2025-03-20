import remove_regex from "@/assets/js/translators/remove_regex.translators";

function remove_space(value) {
  return remove_regex(value, /\s*/g);
}

export default remove_space;
