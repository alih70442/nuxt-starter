function is_number(val) {

  switch (val) {
    // en
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    // fa
    case "۰":
    case "۱":
    case "۲":
    case "۳":
    case "۴":
    case "۵":
    case "۶":
    case "۷":
    case "۸":
    case "۹":
    // Ar
    case "٠":
    case "١":
    case "٢":
    case "٣":
    case "٤":
    case "٥":
    case "٦":
    case "٧":
    case "٨":
    case "٩":
      return true;
    default:
      return false;
  }
}

export default is_number;
