import styles from './styles.less';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import basicModal from '@/components/basicModel';
// import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import materialList from './common/materialList';
import { PromiseRes } from '@/utils/structs';
// import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils';
// import { createRandomNumber } from '../../utils/utils';

const Example2 = (props: any) => {
  const PROPORTION = window.innerWidth / window.innerHeight;
  const [model3D, setModel3D] = useState(
    new basicModal(
      new THREE.Scene(),
      new THREE.PerspectiveCamera(45, PROPORTION, 1, 1000),
      new THREE.WebGLRenderer(),
    ),
  );
  const [uuid, setUuid] = useState('');

  // 设置相机参数
  const cameraConfig = (camera: THREE.Camera) => {
    camera.position.set(100, 100, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  };

  // 设置渲染器参数
  const rendererConfig = (renderer: THREE.WebGLRenderer) => {
    renderer.setClearColor(new THREE.Color(0xcccccc));
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight);
    renderer.shadowMap.enabled = true;
    return renderer;
  };

  // 创建平面
  const addPlane = () => {
    const g1 = new THREE.PlaneGeometry(100, 100);
    const m1 = new THREE.MeshBasicMaterial({
      color: 0xffdeb4,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(g1, m1);
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true;
    model3D.add(plane);
  };

  // 设置轨道控制器
  const addControls = (
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
  ) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
  };

  // 创建坐标轴
  const addAxes = () => {
    const axesHelper = new THREE.AxesHelper(50);
    model3D.add(axesHelper);
  };

  // 创建灯光
  const addLight = () => {
    const light = new THREE.AmbientLight(0x404040); // soft white light
    model3D.add(light);
  };

  // 添加网格模型
  const addMeshObject = () => {
    const geometry = new THREE.TorusKnotGeometry(9, 2.3, 300, 20, 3, 5);
    const torusKnot = new THREE.Mesh(
      geometry,
      materialList['LineBasicMaterial'],
    );
    torusKnot.position.set(0, 20, 0);
    model3D.add(torusKnot);
    return new Promise((resolve, reject) => {
      setUuid((preValue) => {
        // 返回该模型uuid
        resolve(torusKnot.uuid);
        return torusKnot.uuid;
      });
    });
  };

  // 为几何体添加动画
  const animation = (uuid: string) => {
    return (scene: THREE.Scene) => {
      // 获取操控目标
      let target = scene.children.find((item) => {
        return item.uuid === uuid;
      });
      if (target) {
        target.rotation.y += 0.02;
      }
    };
  };

  // 初始化（返回promise，在then中执行开始渲染）
  const init = (dom: HTMLElement) => {
    return new Promise((resolve, reject) => {
      // 添加物体及动画任务栈
      let addTaskList = [];
      // 基本配置
      model3D.configCamera(cameraConfig);
      model3D.configRendered(rendererConfig);
      addAxes();
      addPlane();
      addLight();
      model3D.setTools(addControls);
      model3D.init(dom);
      addTaskList.push(addMeshObject());

      Promise.all(addTaskList).then((res) => {
        if (typeof res[0] === 'string') {
          console.log('动画注入完毕');
          model3D.setRenderFun(animation(res[0]));
        }
        let result: PromiseRes = {
          status: true,
          msg: '可以准备开始渲染',
        };
        resolve(result);
      });
    });
  };

  useEffect(() => {
    const mountElement = document.getElementById('ref');
    if (mountElement) {
      init(mountElement).then((res: any) => {
        console.log(res.msg);
        model3D.startRender();
      });
    }
  }, []);

  return (
    <div className={styles.body}>
      <div id={'ref'} className={styles.section}></div>
    </div>
  );
};

export default Example2;
