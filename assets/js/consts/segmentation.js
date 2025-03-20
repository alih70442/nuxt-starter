import { useUserStore } from "@/stores/StoreUser.js";

const SEGMENT_ = [];

const is_current_user_in_segment = (segment) => {
  const user_id = useUserStore().get_data.id;

  return is_user_in_segment(segment, user_id);
};

const is_user_in_segment = (segment, user_id) => {

  // if (is_dev()) return true;

  if (!user_id) return false;

  return segment.includes(user_id);
};

export {
  SEGMENT_,
  is_user_in_segment,
  is_current_user_in_segment,
};
