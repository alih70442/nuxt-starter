import QrCodeWithLogo from "qrcode-with-logos/src/index";

function generate_qr(content, logo_src) {
  return new Promise(resolve => {
    const image = new QrCodeWithLogo({
      canvas: document.getElementById("canvas"),
      content: content,
      width: 380,
      download: true,
      image: document.getElementById("js-qrcode__image"),
      logo: {
        src: logo_src,
      },
    }).toImage();

    resolve(image);
  });
}

export default generate_qr;
