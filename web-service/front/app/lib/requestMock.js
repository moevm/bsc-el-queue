const createRequestWithTimeout = (data, timeout = 1000) => (
  timeout > 0
    ? new Promise((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, timeout)
    })
    : data
)

export default ({ url, method, data, ...params }) => {
  // if (url.indexOf('user/login') >= 0) {
  //   return userLogin(params)
  // }
}
