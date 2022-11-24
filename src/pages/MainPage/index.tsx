import React, { useState } from 'react';
import { Menu } from 'antd';

import styles from './styles.less';
import Content from './components/Content';
import VirtualList from './components/VirtualList';
import VirtulaListDynamic from './components/VirtulaListDynamic';
import FileDemo from './components/FileDemo';
import AutoPlayDemo from './components/AutoPlayDemo';

const MainPage = (props: any) => {
  const [page, setPage] = useState('AutoPlayDemo');

  const menuItems = [
    { label: '主页', key: 'none' },
    { label: '虚拟列表', key: 'VirtualList' },
    { label: '动态虚拟列表', key: 'VirtulaListDynamic' },
    { label: '文件处理Demo', key: 'FileDemo' },
    { label: '音频自动播放Demo', key: 'AutoPlayDemo' },
  ];

  // 切换子项
  const switchContent = () => {
    switch (page) {
      case 'VirtualList':
        return <VirtualList />;
      case 'VirtulaListDynamic':
        return <VirtulaListDynamic />;
      case 'FileDemo':
        return <FileDemo />;
      case 'AutoPlayDemo':
        return <AutoPlayDemo />;
      default:
        return <VirtualList />;
    }
  };

  // 菜单点击
  const menuChange = (item: any) => {
    console.log('item', item);
    setPage(item.key);
  };

  return (
    <div className={styles['main']}>
      <aside className={styles['menu']}>
        <Menu items={menuItems} onClick={menuChange} defaultSelectedKeys={[page]}></Menu>
      </aside>
      <section className={styles['content']}>
        <Content>{switchContent()}</Content>
      </section>
    </div>
  );
};

export default MainPage;
