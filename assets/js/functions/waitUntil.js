function waitUntil(condition_ref) {
  return new Promise((resolve) => {
    let interval = setInterval(() => {

      if (!condition_ref.value) {
        return;
      }

      clearInterval(interval);
      resolve();
    }, 500);
  });
}

export default waitUntil;
