import styles from './styles.less';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils';
// import * as time from '';

const Example3 = (props: any) => {
  // const [lantern, setLantern] = useState<any>(undefined);
  // const [myScene,setMyScene]=useState<any>(undefined)

  useEffect(() => {
    let webGLRef = document.getElementById('ref');
    if (webGLRef) {
      // 长宽比例
      let proportion = window.innerWidth / window.innerHeight;

      // 创建3要素
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, proportion, 0.1, 1000);
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
      const planeGeometry = new THREE.PlaneGeometry(100, 100);
      const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0x005880,
        side: THREE.DoubleSide,
      });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.set(0, 0, 0);
      plane.rotation.x = -Math.PI / 2;
      plane.receiveShadow = true;
      scene.add(plane);

      // 添加纯白环境光
      const light = new THREE.AmbientLight(0xffffff); // soft white light
      scene.add(light);

      //添加平行光及其光路辅助
      let dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.castShadow = true;
      dirLight.position.set(30, 30, 30);
      dirLight.shadow.camera.near = 0.5;
      dirLight.shadow.camera.far = 100;
      // dirLight.shadow.camera.bottom = 100;
      let dirHelper = new THREE.DirectionalLightHelper(dirLight, 10, 0xfc6379);
      scene.add(dirLight);
      scene.add(dirHelper);
      const helper = new THREE.CameraHelper(dirLight.shadow.camera);
      scene.add(helper);

      // 创建轨道控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      // 外部模型导入
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        'models/Lantern/glTF/Lantern.gltf',
        (gltf) => {
          console.log('导入成功');
          gltf.scene.traverse(function (node) {
            console.log('节点', node);
            node.castShadow = true;
          });
          console.log(gltf.scene);
          scene.add(gltf.scene);
        },
        (progress) => {
          console.log('导入中...');
        },
        (error) => {
          console.log('导入错误');
          console.log(error);
        },
      );

      // 启动渲染并加载节点
      const render = (renderer: any, scene: any, camera: any) => {
        requestAnimationFrame(render.bind(this, renderer, scene, camera));
        renderer.render(scene, camera);
      };

      render(renderer, scene, camera);

      webGLRef.appendChild(renderer.domElement);
    }
  }, []);

  return (
    <div className={styles.body}>
      <section id={'ref'} className={styles.section}></section>
    </div>
  );
};

export default Example3;
