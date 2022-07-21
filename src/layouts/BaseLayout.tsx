import styles from './BaseLayout.less';
import { Menu } from 'antd';
import { history } from 'umi';

const BaseLayout = (props: any) => {
  const { children } = props;
  const items = [
    { label: '主页', key: 'item-1', path: '/home' },
    { label: '示例1', key: 'item-2', path: '/example1' },
    { label: '示例2', key: 'item-3', path: '/example2' },
    { label: '示例3', key: 'item-4', path: '/example3' },
  ];

  const itemchange = (data: any) => {
    let path = data.item.props.path;
    history.push(path);
  };

  return (
    <div className={styles.root_body}>
      <aside className={styles.aside}>
        <Menu items={items} onSelect={itemchange}></Menu>
      </aside>
      <section className={styles.section}>{children}</section>
    </div>
  );
};

export default BaseLayout;
