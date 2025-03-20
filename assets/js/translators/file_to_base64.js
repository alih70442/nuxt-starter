function file_to_base64(file) {
  return new Promise((resolve, reject) => {
    if (FileReader && file) {
      let fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.readAsDataURL(file);
    } else {
      console.log("not supported");
      reject(false);
    }
  });
}

export default file_to_base64;
