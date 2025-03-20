import { computed } from "vue";
import { useRouter } from "vue-router";
import { get_active_role, set_active_role } from "@/assets/js/helpers/get_active_role.js";

const useRoleChanger = () => {

  const router = useRouter();

  const user_role = computed(() => {
    return get_active_role();
  });

  const change_user_role = (role) => {
    set_active_role(role);
    router.push({ name: "dashboard" });
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  return {
    user_role,
    change_user_role,
  };
};

export default useRoleChanger;
