import { convert_phone_number_to_98 } from "@/assets/js/functions/converts";

function mobile_to_whatsapp_link(mobile) {
  return `https://wa.me/${convert_phone_number_to_98(mobile)}`;
}

export default mobile_to_whatsapp_link;
