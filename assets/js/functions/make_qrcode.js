import amadast_text_image from "@/assets/images/core/amadast_text.png";
import QRCode from "easyqrcodejs";

const make_qrcode = (content, element, options) => {
  options = Object.assign({
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
    logoBackgroundTransparent: false,
  }, options);

  new QRCode(element, options);
};

export default make_qrcode;
