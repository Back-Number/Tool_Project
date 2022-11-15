import { faker } from '@faker-js/faker';

const fakeData = (num: number) => {
  let res = new Array(num).fill({});
  res = res.map((item, index) => {
    const newItem = {
      text: faker.lorem.sentences() + ' id:' + index,
      index: index,
    };
    return newItem;
  });
  return res;
};

export default fakeData;
