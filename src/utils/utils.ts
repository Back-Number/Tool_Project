/**
 * 生成随机整数
 * @param {number} min 下界
 * @param  {number} max 上界
 */

export const createRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 判断是否实现了某个接口
 * @param {number} min 下界
 * @param  {number} max 上界
 */

// export function isInterface(object: any): object is A {
//   return object.discriminator === 'I-AM-A';
// }
