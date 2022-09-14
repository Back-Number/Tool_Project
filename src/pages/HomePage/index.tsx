import { useState } from 'react';
import { Button } from 'antd';

const HomePage = (props: any) => {
  const [count, setCount] = useState(0);

  const fun1 = () => {
    return new Promise((resolve, reject) => {
      setCount((preNum) => {
        console.log('pre', preNum);
        resolve(preNum + 1);
        return preNum + 1;
      });
    });
  };

  const test = () => {
    fun1();
  };

  return (
    <div>
      <Button onClick={test}>测试</Button>
      <div>{count}</div>
    </div>
  );
};

export default HomePage;
