import rename_key from "../functions/object/rename_key";

function translate_options(options) {
  options.forEach((item) => {
    rename_key(item, "id", "value");
    rename_key(item, "title", "text");
  });
  return options;
}

export default translate_options;