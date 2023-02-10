import empty from "@/assets/js/functions/empty";

function is_location_complete(location) {
  return [
    location.title,
    location.postal_code
  ].every(value => !empty(value));
}

export default is_location_complete;
