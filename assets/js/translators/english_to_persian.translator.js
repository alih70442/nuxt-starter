const ENGLISH_TO_PERSIAN_MAP = {
  "q": "ض",
  "w": "ص",
  "e": "ث",
  "r": "ق",
  "t": "ف",
  "y": "غ",
  "u": "ع",
  "i": "ه",
  "o": "خ",
  "p": "ح",
  "[": "ج",
  "]": "چ",
  "a": "ش",
  "s": "س",
  "d": "ی",
  "f": "ب",
  "g": "ل",
  "h": "ا",
  "j": "ت",
  "k": "ن",
  "l": "م",
  ";": "ک",
  "'": "گ",
  "z": "ظ",
  "x": "ط",
  "c": "ز",
  "v": "ر",
  "b": "ذ",
  "n": "د",
  "m": "پ",
  ",": "و",

  "Q": "ض",
  "W": "ص",
  "E": "ث",
  "R": "ق",
  "T": "ف",
  "Y": "غ",
  "U": "ع",
  "I": "ه",
  "O": "خ",
  "P": "ح",
  "A": "ش",
  "S": "س",
  "D": "ی",
  "F": "ب",
  "G": "ل",
  "H": "ا",
  "J": "ت",
  "K": "ن",
  "L": "م",
  "Z": "ظ",
  "X": "ط",
  "C": "ز",
  "V": "ر",
  "B": "ذ",
  "N": "د",
  "M": "پ",
};

function english_to_persian(input) {

  var output = "";

  for (var i = 0, il = input.length; i < il; i++) {
    output += ENGLISH_TO_PERSIAN_MAP[input.charAt(i)] || input.charAt(i);
  }

  return output;
}

export default english_to_persian;
