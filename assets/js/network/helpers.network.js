function is_response_ok(response) {
  if (response instanceof Error) return false;

  const statusCode = response.status;
  // TODO: take care do not break old codes
  if (statusCode >= 400 && statusCode <= 500) {
    return false;
  } else if (statusCode >= 200 && statusCode <= 300) {
    return true;
  }

  return response.data.result;
}


export { is_response_ok };
