import * as THREE from 'three';
import { createRandomNumber } from '../../../../utils/utils';
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils';

/**
 * @param  {number} color 十六进制颜色值
 * @param {number} value 待排序的属性值，范围（0~359）
 * @param {number} angel 角度，弧度制
 * @param  {THREE.Scene} scene 要添加到的场景
 * @param  {Function} animate 动画函数
 * @param {number[]} index 可选 位置数组[x,y,z]
 */

export default class CubeStruct {
  instance: THREE.Object3D;
  value: number;
  angel: number; // 弧度，根据value计算而来
  scene: THREE.Scene;
  animate: Function;
  realPosition: number[]; //计算后的实际归位位置

  constructor(
    color: number, // 十六进制颜色
    value: number,
    scene: THREE.Scene,
    animate: Function,
    index?: number[],
  ) {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    });
    let material2 = new THREE.MeshNormalMaterial();
    let lineMaterial = new THREE.MeshLambertMaterial({
      color: 0xb2a4ff,
      wireframe: true,
    });
    let mList = [material2];
    this.instance = SceneUtils.createMultiMaterialObject(geometry, mList);
    this.instance.castShadow = true;
    this.value = value; //设置其内置数值
    this.angel = (Math.PI * 2 * value) / 360; // 角度（弧度制）

    const computedPosition = [
      (value * Math.cos(this.angel)) / 3,
      10,
      (value * Math.sin(this.angel)) / 3,
    ];
    this.realPosition = computedPosition;
    if (index) {
      this.instance.position.set(index[0], index[1], index[2]);
    } else {
      this.instance.position.set(
        createRandomNumber(-15, 15),
        createRandomNumber(5, 25),
        createRandomNumber(-15, 15),
      );
    }

    this.scene = scene; // 添加场景
    this.animate = animate.bind(this); // 设置动画
  }

  // 初始化实例，将其加入场景
  init(): void {
    this.scene.add(this.instance);
  }
}
