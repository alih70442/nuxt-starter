import package_type_sizes from "@/assets/js/consts/package_type_sizes.const";

function list_package_types_with_sizes(options) {
  for (let i = 0; options.length > i; i++) {
    if (!package_type_sizes[i]) continue;
    options[i].title += ` (${package_type_sizes[i]} میلیمتر)`;
  }
  return options;
}

export default list_package_types_with_sizes;
