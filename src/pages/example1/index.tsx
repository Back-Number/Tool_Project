import styles from './styles.less';
import { useEffect } from 'react';
import * as THREE from 'three';
// import { createMeshesFromMultiMaterialMesh } from '../../../node_modules/three/examples/jsm/utils/SceneUtils'

/**
 *
 * @color1 '0xFFF9CA'
 * @color2 '0xFFDEB4'
 * @color3 '0xFFB4B4'
 * @color4 '0xB2A4FF'
 */

const Example1 = (props: any) => {
  useEffect(() => {
    let webGLRef = document.getElementById('ref');
    if (webGLRef) {
      // 长宽比例
      let proportion = window.innerWidth / window.innerHeight;
      // 材质库
      const m1 = new THREE.MeshBasicMaterial({
        color: 0xffdeb4,
        side: THREE.DoubleSide, // 双面材质
      });
      const m2 = new THREE.MeshBasicMaterial({
        color: 0xffb4b4,
        side: THREE.DoubleSide, // 双面材质
      });

      // 创建3要素
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, proportion, 1, 1000);
      const renderer = new THREE.WebGLRenderer();

      // 渲染场景大小，背景颜色，允许阴影
      renderer.setClearColor(new THREE.Color(0xfff9ca));
      renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
      renderer.shadowMapEnabled = true;
      renderer.shadowMapType = THREE.PCFShadowMap; //设置阴影的类型

      // 设置相机视角
      camera.position.set(40, 40, 40);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // 创建坐标轴
      const axesHelper = new THREE.AxesHelper(50);
      scene.add(axesHelper);

      // 创建平面
      const g1 = new THREE.PlaneGeometry(60, 60);
      const plane = new THREE.Mesh(g1, m1);
      plane.rotation.x = Math.PI / 2;
      scene.add(plane);

      // 创建圆环
      const g2 = new THREE.TorusGeometry(5, 1, 16, 50, Math.PI * 2);
      const ring = new THREE.Mesh(g2, m2);
      ring.position.set(0, 20, 0);
      scene.add(ring);

      // 启动渲染并加载节点
      const render = () => {
        requestAnimationFrame(render);
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
