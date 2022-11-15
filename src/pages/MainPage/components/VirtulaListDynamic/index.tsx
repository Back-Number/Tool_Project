import React, { useEffect, useState } from 'react';

import styles from './styles.less';

const VirtulaListDynamic = (props: any) => {
  const [forecastH, setForecastH] = useState(30);

  const [data, setData] = useState([{ name: 'test', height: forecastH }]); // 列表数据
  const [positions, setPositions] = useState({}); // 缓存列表项高度

  const [itemNum, setItemNum] = useState(200); // 数据总量
  const [showItem, setShowItem] = useState(10); // 展示量
  const [startIndex, setStartIndex] = useState(0); // 开始索引
  const [endIndex, setEndIndex] = useState(showItem); // 结束索引
  const [offset, setOffset] = useState(0); // 可视区域偏移量

  // 初始化随机数据
  useEffect(() => {
    let listData = new Array(itemNum).fill({});
    listData = listData.map((item, index) => {
      const newItem = { name: '测试', height: 30 };
      return newItem;
    });
    setData(listData);
  }, []);

  // 渲染列表项
  const listItem = (item: any) => {
    const height = item.height;

    return (
      <div className={styles['list-item']} style={{ height: `${height}px` }}>
        <span>{item.name}</span>
        <span>{item.num}</span>
      </div>
    );
  };

  // 虚拟列表
  const virtualList = () => {
    const renderData = data.slice(startIndex, endIndex); // 实际渲染的可视数据

    // 发生滚动
    const handleScroll = (e: any) => {
      const scrollTop = e.target.scrollTop;
      let startIndex = Math.floor(scrollTop / forecastH); // 起始位置
      let endIndex = startIndex + showItem; // 结束位置
      const offset = scrollTop - (scrollTop % forecastH); // 偏移量

      if (startIndex > 2) startIndex -= 2; // 首尾多渲染两条数据，减少空白
      if (endIndex < itemNum - 1) endIndex += 2;

      setOffset(offset);
      setStartIndex(startIndex);
      setEndIndex(endIndex);
    };

    return (
      <div
        className={styles['list']}
        onScroll={handleScroll}
        style={{ height: `${showItem * forecastH}px` }}
      >
        {/* 占位栏 */}
        <div
          className={styles['list-virtual']}
          style={{ height: `${itemNum * forecastH}px` }}
        ></div>
        {/* 可视渲染栏 */}
        <div
          className={styles['list-truth']}
          style={{ transform: `translate3d(0,${offset}px,0` }}
        >
          {renderData.map((item, index) => {
            return <div key={index}>{listItem(item)}</div>;
          })}
        </div>
      </div>
    );
  };

  return <div className={styles['list-wrapper']}>{virtualList()}</div>;
};

export default VirtulaListDynamic;
