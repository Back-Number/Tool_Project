import styles from './styles.less';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { debounce } from 'lodash';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { materialList, getGuiOptionList } from './common/materialList';
import basicModal from '@/components/basicModel';
import { PromiseRes } from '@/utils/structs';
// import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils';
// import { createRandomNumber } from '../../utils/utils';

const Example2 = (props: any) => {
  // 长宽比例定值
  const PROPORTION = window.innerWidth / window.innerHeight;

  const [model3D, setModel3D] = useState(
    new basicModal(
      new THREE.Scene(),
      new THREE.PerspectiveCamera(45, PROPORTION, 1, 1000),
      new THREE.WebGLRenderer(),
    ),
  ); // THREE.js3D实例
  const [uuid, setUuid] = useState(''); // 记录当前对象uuid
  const [materialName, setMaterialName] = useState('LineBasicMaterial'); // 记录材质名称
  const [material, setMaterial] = useState(materialList('LineBasicMaterial')); // 记录当前物体的材质
  const [gui, setGui] = useState<any>(undefined); // 记录GUI实例
  const [guiOptionObject, setGuiOptionObject] = useState({}); // GUI属性对象
  const [isFirstInit, setIsFirstInit] = useState(true); // 标记是否是初次渲染

  // GUI控件对象
  const option = {
    materialName: 'LineBasicMaterial',
  };

  //材质名列表
  const nameList = [
    'LineBasicMaterial',
    'LineDashedMaterial',
    'MeshBasicMaterial',
    'MeshDepthMaterial',
    'MeshDistanceMaterial',
    'MeshLambertMaterial',
  ];

  // 添加参数调节界面
  const addGUIControl = () => {
    // if (gui) {
    //   gui.destroy();
    // }
    // const { optionObject, config } = getGuiOptionList(materialName);
    // setGuiOptionObject(optionObject);
    // const myGui = new dat.GUI({});
    // setGui(myGui);
    // myGui
    //   .add(option, 'materialName', nameList)
    //   .name('材质名称')
    //   .onChange((e: string) => {
    //     setMaterialName(e);
    //     setMaterial(materialList(e));
    //   });
    // config.forEach((item) => {
    //   if (item.name === 'color') {
    //     myGui
    //       .addColor(optionObject, item.name)
    //       .name(item.name)
    //       .onChange(
    //         debounce(() => {
    //           console.log('变化', optionObject);
    //           setGuiOptionObject(JSON.parse(JSON.stringify(optionObject)));
    //         }, 500),
    //       );
    //   } else {
    //     //
    //     myGui
    //       .add(optionObject, item.name, ...item.configOption)
    //       .name(item.name)
    //       .onChange(
    //         debounce(() => {
    //           console.log('变化', optionObject);
    //           setGuiOptionObject(JSON.parse(JSON.stringify(optionObject)));
    //         }, 500),
    //       );
    //   }
    // });
  };

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
    const torusKnot = new THREE.Mesh(geometry, material);
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
      addGUIControl();
      model3D.setTools(addControls);
      model3D.init(dom);
      addTaskList.push(addMeshObject());

      Promise.all(addTaskList).then((res) => {
        if (typeof res[0] === 'string') {
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

  // 初始化场景
  useEffect(() => {
    const mountElement = document.getElementById('ref');
    if (mountElement) {
      init(mountElement).then((res: any) => {
        if (res.status) {
          model3D.startRender();
        }
      });
    }
  }, []);

  // 监听到材质变化
  useEffect(() => {
    // item的父类实际上是THREE.Object3D
    const editFun = (item: any) => {
      item.material = material;
    };
    if (!isFirstInit) {
      console.log('设置新材质');
      model3D.editObject(uuid, editFun);
    }
    setIsFirstInit(false);
  }, [material]);

  // 材质参数变化生成新材质
  useEffect(() => {
    console.log('材质对象改变了', guiOptionObject);
    setMaterial(materialList(materialName, guiOptionObject));
  }, [guiOptionObject]);

  return (
    <div className={styles.body}>
      <div id={'ref'} className={styles.section}></div>
    </div>
  );
};

export default Example2;
