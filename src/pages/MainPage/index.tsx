import React from 'react';
import { Menu } from 'antd';

const MainPage = (props: any) => {
  const menuItems = [
    { label: 'card1', key: 'item-1', path: '/home' },
    { label: '虚拟列表', key: 'item-2', path: '/example1' },
  ];

  return (
    <div>
      <Menu items={menuItems}></Menu>
    </div>
  );
};

export default MainPage;
