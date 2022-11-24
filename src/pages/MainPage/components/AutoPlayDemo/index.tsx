import React, { useEffect, useState } from 'react';

import testMusicDemo from '@assets/music/testMusicDemo.mp3';
import styles from './styles.less';

let count = 600;
const AutoPlayDemo = (props: any) => {
  const [src, setSrc] = useState<undefined | string>(undefined);
  const [delay, setDelay] = useState(count); // 加载延迟
  const [timer, setTimer] = useState<undefined | NodeJS.Timeout>(undefined); // 定时器
  const [clickIndex, setClickIndex] = useState(0);

  useEffect(() => {
    // console.log('设置定时器');
    // const delayTimer = setInterval(() => {
    //   setDelay(count--);
    //   while (count === 0) {
    //     setSrc(testMusicDemo);
    //     clearInterval(timer);
    //   }
    // }, 1000);
    // setTimer(delayTimer);
    setTimeout(() => {
      setSrc(testMusicDemo);
    }, delay * 1000);
  }, []);

  // body点击
  const handleClick = () => {
    console.log('发生了点击交互');
    setClickIndex(delay);
  };

  return (
    <div className={styles['main']} onClick={handleClick}>
      <span>自动播放测试</span>

      <div>加载倒计时{delay}s</div>
      {clickIndex ? <div>你于{clickIndex}s进行了点击</div> : null}
      <audio className={styles['audio']} controls autoPlay src={src}></audio>
    </div>
  );
};

export default AutoPlayDemo;
