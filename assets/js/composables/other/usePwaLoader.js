import { computed } from "vue";
import { useAppStore } from "@/stores/StoreApp";
import useToast from "@/assets/js/composables/layout/useToast.js";

const STATUS_PENDING = "pending";
const STATUS_INSTALLED = "installed";
const STATUS_CANNOT_INSTALL = "cannot-install";

const usePwaLoader = () => {

  const appStore = useAppStore();

  const is_app_installed = computed(() => {
    return appStore.get_pwa_installation_status === STATUS_INSTALLED;
  });

  const deferredPrompt = computed(() => {
    return appStore.get_deferred_prompt;
  });

  const can_install = computed(() => {
    return deferredPrompt.value !== null || is_app_installed.value;
  });

  const install_pwa = async () => {

    if (is_app_installed.value) {
      useToast().create_warning("شما وب اپلیکیشن تامینیفای را قبلا نصب کرده اید.");
      return;
    }

    if (can_install.value) {
      deferredPrompt.value.prompt();
      const { outcome } = await deferredPrompt.value.userChoice;
      if (outcome === "accepted") {
        appStore.set_deferred_prompt(null);
        return true;
      }
      return false;
    }
  };

  const init_pwa = () => {
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      appStore.set_deferred_prompt(null);
      appStore.set_pwa_installation_status(STATUS_INSTALLED);
    } else {

      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();

        appStore.set_deferred_prompt(e);
        appStore.set_pwa_installation_status(STATUS_PENDING);
      });

      window.addEventListener("appinstalled", () => {
        appStore.set_deferred_prompt(null);
        appStore.set_pwa_installation_status(STATUS_INSTALLED);
      });
    }
  };

  return {
    can_install,
    is_app_installed,
    init_pwa,
    install_pwa,
  };
};

export default usePwaLoader;
