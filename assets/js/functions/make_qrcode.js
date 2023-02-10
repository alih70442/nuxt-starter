import amadast_text_image from "@/assets/images/core/amadast_text.png";
import QRCode from "easyqrcodejs";

const make_qrcode = (content, element, options) => {
  let defaults_options = {
    text: content,
    width: 120,
    height: 120,
    colorDark: "#000000",
    colorLight: "#ffffff",

    logo: amadast_text_image,
    logoWidth: 40,
    logoHeight: 20,
    logoMaxWidth: undefined,
    logoMaxHeight: undefined,
    logoBackgroundColor: "#fffff",
    logoBackgroundTransparent: false
  };
  Object.assign(defaults_options, options);

  new QRCode(element, defaults_options);
};

export default make_qrcode;
