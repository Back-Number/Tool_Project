import styles from './BaseLayout.less';

const BaseLayout = (props: any) => {
  const { children } = props;

  return <div className={styles.root_body}>{children}</div>;
};

export default BaseLayout;
