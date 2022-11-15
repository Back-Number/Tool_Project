import React from 'react';

import styles from './styles.less';

const Content = (props: any) => {
  const { children } = props;
  return <div className={styles['wrapper']}>{children}</div>;
};

export default Content;
