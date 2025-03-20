import { ROUTES_SUPPLIER } from "@/router/routesSupplier.js";
import RoleEnum from "@/assets/js/consts/roles.const";
import { ROUTES_DROP_SHIPPER } from "@/router/routesShipper";

const routesMapper = {
  [RoleEnum.dropShipper]: ROUTES_DROP_SHIPPER,
  [RoleEnum.supplier]: ROUTES_SUPPLIER,
};

function mapRoutes(user_role) {
  return routesMapper[user_role];
}

export default mapRoutes;
