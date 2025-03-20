function middleware(rs, middlewares) {

  for (const middleware of middlewares) {
    rs = middleware(rs);
  }
  return rs;
}

export default middleware;
