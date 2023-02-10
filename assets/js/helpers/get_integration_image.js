import instagram from "~/assets/images/channels/instagram.png";
import wordpress from "~/assets/images/channels/wordpress.png";
import digikala from "~/assets/images/channels/digikala.png";
import basalam from "~/assets/images/channels/basalam.png";
import esam from "~/assets/images/channels/esam.png";
import divar from "~/assets/images/channels/divar.png";

function get_integration_image(integration_name){
  switch (integration_name) {
    case "instagram":
      return instagram;
    case "wordpress":
      return wordpress;
    case "digikala":
      return digikala;
    case "basalam":
      return basalam;
    case "esam":
      return esam;
    case "divar":
      return divar;
  }
}

export default get_integration_image;
