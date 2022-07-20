import styles from './BaseLayout.less';
import { history } from 'umi';

const BaseLayout = (props) => {
  const { children } = props;
  console.log('history', history);
  return <div className={styles.root_body}>{children}</div>;
};

export default BaseLayout;
