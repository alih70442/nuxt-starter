const fake_axios = (data) => {
  return new Promise(resolve => {
    resolve(data);
  });
};

export default fake_axios;
