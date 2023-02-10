function unique_id() {
  return "id_" + Math.random().toString(16).slice(2);
}

export default unique_id;