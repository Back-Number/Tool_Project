import React from 'react';

import testMusicDemo from '@assets/music/testMusicDemo.mp3';
import styles from './styles.less';

const AutoPlayDemo = (props: any) => {
  return (
    <div className={styles['main']}>
      <span>自动播放测试</span>
      <audio className={styles['audio']} controls src={testMusicDemo}></audio>

      <div className={styles['iframe']}>
        <iframe src={'http://localhost:8058/#/frame'}></iframe>
      </div>
    </div>
  );
};

export default AutoPlayDemo;
