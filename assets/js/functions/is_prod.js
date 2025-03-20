function is_prod() {
  return import.meta.env.VITE_IS_DEV !== "1";
}

export default is_prod;
