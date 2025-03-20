const pass_form_file = (value, name) => {
  if (typeof value === "string") return {};

  if (!value) return { [name]: "" };

  // TODO: fix register startup info logo pass on empty --> pass nothing
  // if (value === null) return {};

  return { [name]: value };
};

export default pass_form_file;
