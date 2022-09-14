/**
 *  通用场景基类
 */

import { DOMElement } from 'react';

export default class basicModal {
  //属性
  scene: THREE.Scene; // 场景
  camera: THREE.Camera; // 相机
  renderer: THREE.WebGLRenderer; // 渲染器
  renderFun: Function[]; // 动画函数数组

  //构造函数
  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    renderFun?: Function[],
  ) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.renderFun = renderFun ? renderFun : [];
  }

  // 场景设置
  configScene(configFun: Function): void {
    this.scene = configFun(this.scene);
  }

  // 相机设置
  configCamera(configFun: Function): void {
    this.camera = configFun(this.camera);
  }

  // 渲染器设置
  configRendered(configFun: Function): void {
    this.renderer = configFun(this.renderer);
  }

  // 向场景中添加物体
  add(object: THREE.Object3D): void {
    this.scene.add(object);
  }

  // 设置渲染动画函数
  setRenderFun(fun: Function): void {
    this.renderFun.push(fun);
  }

  // 设置其它属性（诸如轨道控制器）
  setTools(fun: Function): void {
    fun(this.scene, this.camera, this.renderer);
  }

  // 启动循环渲染
  startRender(): void {
    requestAnimationFrame(this.startRender.bind(this));
    // 动画函数根据uuid来获取对象
    this.renderFun.forEach((item) => {
      item(this.scene);
    });
    this.renderer.render(this.scene, this.camera);
  }

  // 渲染内容添加到div节点中
  init(dom: HTMLElement): void {
    dom.appendChild(this.renderer.domElement);
  }
}
