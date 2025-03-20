function sleeper(ms = 2000) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

export default sleeper;