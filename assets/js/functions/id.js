let current_id = 1;

function get_id(has_increement = false) {
  const last_id = current_id;
  if (has_increement)
    current_id++;
  return "id_" + last_id;
}

export default get_id;
