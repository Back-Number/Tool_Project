import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';

import styles from './styles.less';

const VirtualList = (props: any) => {
  const [data, setData] = useState([{ name: 'test', num: 0 }]); // 列表数据
  const [listType, setListType] = useState(true); // true虚拟列表，false普通列表

  const [itemNum, setItemNum] = useState(200); // 数据总量
  const [itemHeight, setItemHeight] = useState(32); // 列表项高度（单位px）
  const [showItem, setShowItem] = useState(10); // 展示量
  const [startIndex, setStartIndex] = useState(0); // 开始索引
  const [endIndex, setEndIndex] = useState(showItem); // 结束索引
  const [offset, setOffset] = useState(0); // 可视区域偏移量

  // 初始化随机数据
  useEffect(() => {
    let listData = new Array(itemNum).fill({});
    listData = listData.map((item, index) => {
      const newItem = { name: '测试', num: index + 1 };
      return newItem;
    });
    setData(listData);
  }, []);

  // 渲染列表项
  const listItem = (item: any) => {
    // 子项样式
    const itemStyle = {
      height: `${itemHeight}px`, // 附加8px的margin
      lineHeight: `${itemHeight - 8}px`,
    };

    return (
      <div className={styles['list-item']} style={itemStyle}>
        <span>{item.name}</span>
        <span>{item.num}</span>
      </div>
    );
  };

  // 普通列表
  const normalList = () => {
    return (
      <div
        className={styles['list']}
        style={{ height: `${showItem * itemHeight}px` }}
      >
        {data.map((item) => {
          return <div key={item.num}>{listItem(item)}</div>;
        })}
      </div>
    );
  };

  // 虚拟列表
  const virtualList = () => {
    const renderData = data.slice(startIndex, endIndex); // 实际渲染的可视数据

    // 发生滚动
    const handleScroll = (e: any) => {
      const scrollTop = e.target.scrollTop;
      let startIndex = Math.floor(scrollTop / itemHeight); // 起始位置
      let endIndex = startIndex + showItem; // 结束位置
      const offset = scrollTop - (scrollTop % itemHeight); // 偏移量

      if (startIndex > 2) startIndex -= 2; // 首尾多渲染两条数据，减少空白
      if (endIndex < itemNum - 1) endIndex += 2;

      setOffset(offset);
      setStartIndex(startIndex);
      setEndIndex(endIndex);
    };

    /*
     * 分为占位栏和可视渲染栏，他们定位均为absolute，且顶部贴齐父组件，
     * 占位栏高度为总高度用于滚动，可视栏高度为渲染的可视数据高度，并由transform偏移到可视位置
     */
    return (
      <div
        className={styles['list']}
        onScroll={handleScroll}
        style={{ height: `${showItem * itemHeight}px` }}
      >
        {/* 占位栏 */}
        <div
          className={styles['list-virtual']}
          style={{ height: `${itemNum * itemHeight}px` }}
        ></div>
        {/* 可视渲染栏 */}
        <div
          className={styles['list-truth']}
          style={{ transform: `translate3d(0,${offset}px,0` }}
        >
          {renderData.map((item) => {
            return <div key={item.num}>{listItem(item)}</div>;
          })}
        </div>
      </div>
    );
  };

  // 切换开关
  const switchChange = (value: any) => {
    setListType(value);
  };

  return (
    <div className={styles['list-wrapper']}>
      <div className={styles['list-switch']}>
        <Switch
          checkedChildren="虚拟列表"
          unCheckedChildren="普通列表"
          defaultChecked={true}
          onChange={switchChange}
        />
      </div>
      {listType ? virtualList() : normalList()}
    </div>
  );
};

export default VirtualList;
