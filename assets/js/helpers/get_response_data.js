const get_response_data = (rs) => {
  return rs?.response ? rs.response.data.data : rs.data.data;
};

export default get_response_data;
