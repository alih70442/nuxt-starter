function incrementVersion(version) {
  return (parseInt(version.split(".").join("")) + 1).toString().split("").join(".");
}

export default incrementVersion;
