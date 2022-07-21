import { message } from 'antd';

/**请求方法 */
export const fetchRequest = async (requestApi, params, callBack) => {
  let data = await requestApi(params);
  if (callBack) {
    if (data.code === 200) {
      callBack(data);
    }
    // else {
    //   message.warning(`请求错误：${data.msg}`);
    // }
  }
  return data;
};
