const is_ltr = str => {
  if (typeof str !== "string") return false;
  if (!str.length) return false;

  const x = new RegExp("[a-zA-Z]+");

  str = str.trim();

  const first_char = str[0];

  return x.test(first_char);
};

export default is_ltr;
