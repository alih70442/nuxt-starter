function is_dev() {
  return import.meta.env.VITE_IS_DEV === "1";
}

export default is_dev;
