function is_sheba_saman(value) {
  if (!value || value?.length < 5) return false;

  return value.startsWith("56", 3);
}

export default is_sheba_saman;

