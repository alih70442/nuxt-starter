function empty(variable) {
  return [
    null,
    undefined,
    "",
    false,
    0,
    0.0,
  ].includes(variable) || variable.length === 0 || (typeof (variable) === "object" && !Object.keys(variable).length);
}

export default empty;
