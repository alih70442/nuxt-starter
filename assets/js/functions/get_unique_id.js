let current_id = 1;

export default function get_unique_id() {
  return "unique_id_" + (++current_id);
}
