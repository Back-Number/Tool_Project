import styles from './styles.less';
import { useEffect } from 'react';
import * as THREE from 'three';
// import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils';
import { createRandomNumber } from '../../utils/utils';

/**
 *
 * @color1 '0xFFF9CA'
 * @color2 '0xFFDEB4'
 * @color3 '0xFFB4B4'
 * @color4 '0xB2A4FF'
 */

class CubeStruct {
  instance: THREE.Object3D;
  value: number;
  scene: THREE.Scene;
  animate: Function;

  constructor(
    color: number, // 十六进制颜色
    index: number[],
    value: number,
    scene: THREE.Scene,
    animate: Function,
  ) {
    // 生成立方体实例
    let geometry = new THREE.BoxGeometry(1, 1, 1); // 几何体
    let material = new THREE.MeshBasicMaterial({
      // 材质
      color: color,
      side: THREE.DoubleSide,
    });
    let lineMaterial = new THREE.MeshLambertMaterial({
      // 线框材质
      color: 0xb2a4ff,
      wireframe: true,
    });
    let mList = [material, lineMaterial]; // 材质组
    this.instance = SceneUtils.createMultiMaterialObject(geometry, mList); // 生成网格对象
    this.instance.position.set(index[0], index[1], index[2]); // 初始化位置
    this.value = value; //设置其内置数值
    this.scene = scene; // 添加场景
    this.animate = animate.bind(this); // 设置动画
  }

  // 初始化实例，将其加入场景
  init(): void {
    this.scene.add(this.instance);
  }
}

const Example1 = (props: any) => {
  useEffect(() => {
    let webGLRef = document.getElementById('ref');
    if (webGLRef) {
      // 长宽比例
      let proportion = window.innerWidth / window.innerHeight;
      const colorList = [0xbbe06c, 0x7cb855, 0x469b4c, 0x3c6e57];

      // 创建3要素
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, proportion, 1, 1000);
      const renderer = new THREE.WebGLRenderer();

      // 渲染场景大小，背景颜色，允许阴影
      renderer.setClearColor(new THREE.Color(0xfff9ca));
      renderer.setSize(window.innerWidth * 0.9, window.innerHeight);

      // 设置相机视角
      camera.position.set(40, 40, 40);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // 创建坐标轴
      const axesHelper = new THREE.AxesHelper(50);
      scene.add(axesHelper);

      // 创建平面
      const g1 = new THREE.PlaneGeometry(60, 60);
      const m1 = new THREE.MeshBasicMaterial({
        color: 0xffdeb4,
        side: THREE.DoubleSide,
      });
      const plane = new THREE.Mesh(g1, m1);
      plane.rotation.x = Math.PI / 2;
      scene.add(plane);

      // 创建立方体组
      let i = 0;
      let cubuList: CubeStruct[] = [];
      while (i < 10) {
        const cube = new CubeStruct(
          colorList[Math.ceil(Math.random() * 4) - 1],
          [
            createRandomNumber(-15, 15),
            createRandomNumber(0, 15),
            createRandomNumber(-15, 15),
          ],
          createRandomNumber(0, 100),
          scene,
          function (this: any) {
            this.instance.rotation.x += 0.05;
            this.instance.rotation.y += 0.05;
          },
        );
        cube.init();
        cubuList.push(cube);
        i++;
      }

      // 创建轨道控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      // 启动渲染并加载节点
      const render = () => {
        requestAnimationFrame(render);
        controls.update();
        cubuList.forEach((item) => {
          item.animate();
        });
        renderer.render(scene, camera);
      };
      render();

      webGLRef.appendChild(renderer.domElement);
    }
  }, []);

  return (
    <div className={styles.body}>
      <section id={'ref'} className={styles.section}></section>
    </div>
  );
};

export default Example1;
