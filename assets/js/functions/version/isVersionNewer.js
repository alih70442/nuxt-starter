function isVersionNewer(a, b) {
  let partsA = a.split(".");
  let partsB = b.split(".");
  let numParts = partsA.length > partsB.length ? partsA.length : partsB.length;
  let i;

  for (i = 0; i < numParts; i++) {
    if ((parseInt(partsB[i], 10) || 0) !== (parseInt(partsA[i], 10) || 0)) {
      return ((parseInt(partsB[i], 10) || 0) > (parseInt(partsA[i], 10) || 0));
    }
  }

  return false;
}

export default isVersionNewer;