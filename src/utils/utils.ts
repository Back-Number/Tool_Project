import { message } from 'antd';

/**请求方法 */
export const fetchRequest = async (
  requestApi: Function,
  params: Object,
  callBack: Function,
) => {
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

/**
 * 生成随机整数
 * @param {number} min 下界
 * @param  {number} max 上界
 */

export const createRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
