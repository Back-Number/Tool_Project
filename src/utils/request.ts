import { message } from 'antd';

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 */

export default function request(url: string, options?: object) {
  const defaultOptions = {
    method: 'GET',
  };
  const newOptions = { ...defaultOptions, ...options };

  return fetch(url, newOptions)
    .then((response) => {
      // console.log('响应', response)
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else if (response.status >= 400 && response.status < 600) {
        message.error('服务错误');
        throw {
          code: 0,
          success: false,
          message: response.statusText,
          data: {},
        };
      }
    })
    .catch((err) => {
      return err;
    });
}
