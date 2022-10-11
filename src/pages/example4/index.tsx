/**
 *  这是一个动态眼睛的demo，（采用echarts实现）
 */

import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import styles from './styles.less';

const example4 = (props: any) => {
  useEffect(() => {
    let eyeball = document.getElementById('eyeball'); // 获取eyeball元素
    if (eyeball) {
      console.log('确定执行');
      let eyeballChart = echarts.init(eyeball); // 初始化画布
      const options = {
        series: [
          {
            type: 'gauge', // 使用仪表盘类型
            radius: '-20%', // 采用负数是为了让分割线从内向外延伸
            clockwise: false,
            startAngle: '0', // 起始角度
            endAngle: '270', // 结束角度
            splitNumber: 3, // 分割数量，会将270度分割为3份，所以有四根线
            detail: false,
            axisLine: {
              show: false,
            },
            axisTick: false,
            splitLine: {
              show: true,
              length: 12, // 分割线长度
              lineStyle: {
                shadowBlur: 20, // 阴影渐变
                shadowColor: 'rgb(0, 238, 255)', // 阴影颜色
                shadowOffsetY: '0',
                color: 'rgb(0, 238, 255)', // 分割线颜色
                width: 4, // 分割线宽度
              },
            },
            axisLabel: false,
          },
          {
            type: 'gauge',
            radius: '-20%',
            clockwise: false,
            startAngle: '45', // 倾斜45度
            endAngle: '315',
            splitNumber: 3,
            detail: false,
            axisLine: {
              show: false,
            },
            axisTick: false,
            splitLine: {
              show: true,
              length: 16,
              lineStyle: {
                shadowBlur: 20,
                shadowColor: 'rgb(0, 238, 255)',
                shadowOffsetY: '0',
                color: 'rgb(0, 238, 255)',
                width: 4,
              },
            },
            axisLabel: false,
          },
        ],
      };
      eyeballChart.setOption(options);
    }
  }, []);

  return (
    <div className={styles.eyeSocket}>
      <div id="eyeball" className={styles.eyeball}></div>
    </div>
  );
};

export default example4;
