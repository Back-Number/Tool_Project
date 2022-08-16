import { useCallback } from 'react';
import { Button } from 'antd';

const HomePage = (props: any) => {
  const btnClick = useCallback(() => {
    let flag = 1;
    return () => {
      console.log('flag', flag);
      if (flag) {
        flag = 0;
        console.log(flag);
      }
    };
  }, []);

  return (
    <div>
      <Button type="primary" onClick={btnClick()}>
        主页
      </Button>
    </div>
  );
};

export default HomePage;
