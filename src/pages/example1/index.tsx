import styles from './styles.less';
import { useEffect } from 'react';
import * as THREE from 'three';
// import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils';
// import { createRandomNumber } from '../../utils/utils';
import CubeStruct from './components/CubeStruct';

/**
 *
 * @color1 '0xFFF9CA'
 * @color2 '0xFFDEB4'
 * @color3 '0xFFB4B4'
 * @color4 '0xB2A4FF'
 */

/**
 *
 */

const Example1 = (props: any) => {
  let step = 0;

  useEffect(() => {
    let webGLRef = document.getElementById('ref');
    if (webGLRef) {
      // 长宽比例
      let proportion = window.innerWidth / window.innerHeight;
      const colorList = [0xbbe06c, 0xfcff89, 0xeaafaf, 0xbbded6];

      // 创建3要素
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, proportion, 1, 1000);
      const renderer = new THREE.WebGLRenderer();

      // 渲染场景大小，背景颜色，允许阴影
      renderer.setClearColor(new THREE.Color(0xfff9ca));
      renderer.setSize(window.innerWidth * 0.9, window.innerHeight);
      renderer.shadowMap.enabled = true;

      // 设置相机视角
      camera.position.set(100, 100, 100);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // 创建坐标轴
      const axesHelper = new THREE.AxesHelper(50);
      scene.add(axesHelper);

      // 创建平面
      const g1 = new THREE.PlaneGeometry(100, 100);
      const m1 = new THREE.MeshBasicMaterial({
        color: 0xffdeb4,
        side: THREE.DoubleSide,
      });
      const plane = new THREE.Mesh(g1, m1);
      plane.rotation.x = Math.PI / 2;
      plane.receiveShadow = true;
      scene.add(plane);

      // 添加聚光灯
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 100, -100);
      scene.add(directionalLight);

      // 创建立方体组
      let i = 0;
      let cubuList: CubeStruct[] = [];
      while (i < 360) {
        // 创建立方体实例
        const cube = new CubeStruct(
          colorList[Math.ceil(Math.random() * 4) - 1],
          // createRandomNumber(-15, 15),
          i + 1,
          scene,
          function (this: any) {
            this.instance.position.set(...this.realPosition);
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
      const render = (step: number) => {
        controls.update();
        if (step < 359) {
          step += 0.2;
        }
        cubuList[Math.floor(step)].animate();
        requestAnimationFrame(render.bind(this, step));
        renderer.render(scene, camera);
      };

      render(step);

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
