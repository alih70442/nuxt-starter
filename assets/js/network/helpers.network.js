function is_response_ok(response) {
  if (response instanceof Error)
    return false;
  return response.data.result;
}

export { is_response_ok };
