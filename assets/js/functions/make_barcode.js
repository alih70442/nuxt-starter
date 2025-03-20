import "jsbarcode/dist/barcodes/JsBarcode.code128.min";

const make_barcode = (content, element_selector, options) => {
  const defaults = {
    format: "CODE128",
    lineColor: "#000000",
    width: 2,
    height: 30,
    margin: 10,
    displayValue: false,
  };
  Object.assign(defaults, options);
  JsBarcode(element_selector, content, defaults);
};

export default make_barcode;