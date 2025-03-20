import get_response_data from "@/assets/js/helpers/get_response_data.js";

const test_request = request_handler => {
  return request_handler().then(rs => {
    console.log(get_response_data(rs));
    return rs;
  });
};

export default test_request;
