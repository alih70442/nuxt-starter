function wait_until(condition_function) {

  const poll = resolve => {
    if (condition_function()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  };

  return new Promise(poll);
}

export default wait_until;
