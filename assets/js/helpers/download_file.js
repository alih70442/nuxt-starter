const download_file_automatically = (name, url) => {
  var link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
};

export default download_file_automatically;
