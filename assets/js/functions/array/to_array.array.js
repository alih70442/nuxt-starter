function to_array(variable) {
  return Array.isArray(variable) ? variable : [variable];
}

export default to_array;
