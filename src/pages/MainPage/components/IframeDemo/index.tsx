import React from 'react';

import testMusicDemo from '@assets/music/testMusicDemo.mp3';
import styles from './styles.less';

const IframeDemo = (props: any) => {
  return (
    <div className={styles['main']}>
      <span>Iframe自动播放demo</span>
      <div className={styles['iframe']}>
        <iframe allow="autoplay" src={'http://localhost:8058/#/frame'}></iframe>
      </div>
    </div>
  );
};

export default IframeDemo;
