function create_sequence_numbers(from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from);

}

export default create_sequence_numbers;
