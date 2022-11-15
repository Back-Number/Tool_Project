import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

import styles from './styles.less';
import fakeData from './common/fakeData';

const VirtulaListDynamic = (props: any) => {
  const [forecastH, setForecastH] = useState(60); // 预估高度
  const [itemNum, setItemNum] = useState(20); // 数据总量

  const [data, setData] = useState(fakeData(itemNum)); // 列表数据
  const [positions, setPositions] = useState([
    { index: -1, top: 0, bottom: 0, height: 0 },
  ]); // 缓存列表项高度

  const [showItem, setShowItem] = useState(10); // 展示量
  const [startIndex, setStartIndex] = useState(0); // 开始索引
  const [endIndex, setEndIndex] = useState(showItem); // 结束索引
  const [offset, setOffset] = useState(0); // 可视区域偏移量

  // 获取实际渲染高度
  useEffect(() => {
    initPositions(positions);
  }, [offset]);

  // 初始化预估高度缓存
  useEffect(() => {
    const newPositions = data.map((item, index) => {
      return {
        index,
        height: forecastH,
        top: index * forecastH,
        bottom: (index + 1) * forecastH,
      };
    });
    initPositions(newPositions);
  }, []);

  // 初始化高度缓存
  const initPositions = (positions: any) => {
    let copyPositions = JSON.parse(JSON.stringify(positions));
    if (copyPositions.length === 1) {
      return;
    }

    const nodes = document.getElementById('listWindow');
    if (nodes) {
      nodes.childNodes.forEach((wraperNode) => {
        const node = wraperNode.firstChild;
        if (node) {
          // node即为列表项
          const id = Number((node as any).id); // 当前id
          const currentHeight = (node as any).scrollHeight; // 当前实际高度
          const oldPosition = copyPositions[id]; // 老的缓存高度

          const Dvalue = currentHeight - oldPosition.height; // 高度差
          if (Dvalue) {
            copyPositions[id].height = currentHeight;
            copyPositions[id].top = copyPositions[id - 1]
              ? copyPositions[id - 1].bottom
              : 0;
            copyPositions[id].bottom = copyPositions[id].top + currentHeight;
          }
        }
      });
    }
    setPositions(copyPositions);
  };

  // 渲染列表项
  const listItem = (item: any) => {
    let height = 0;

    // 初始化列表项高度
    const index = positions.findIndex((position) => {
      return position.index === item.index;
    });
    if (index !== -1) {
      height = positions[index].height;
    } else {
      height = forecastH;
    }

    return (
      <div
        id={item.index}
        className={styles['list-item']}
        style={{ height: `${height}px` }}
      >
        <span>{item.text}</span>
      </div>
    );
  };

  // 虚拟列表
  const virtualList = () => {
    console.log('缓存', positions);
    const renderData = data.slice(startIndex, endIndex); // 实际渲染的可视数据

    // 发生滚动
    const handleScroll = (e: any) => {
      const scrollTop = e.target.scrollTop;
      const starPosition = positions.findIndex((item) => {
        return item.bottom > scrollTop;
      });

      let startIndex = Math.floor(scrollTop / forecastH); // 起始位置
      let endIndex = startIndex + showItem; // 结束位置
      const offset = starPosition > 1 ? positions[starPosition - 1].bottom : 0; // 偏移量

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
          style={{ height: `${positions.slice(-1)[0].bottom}px` }}
        ></div>
        {/* 可视渲染栏 */}
        <div
          id={'listWindow'}
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
