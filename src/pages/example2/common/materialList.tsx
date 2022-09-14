import * as THREE from 'three';

const materialList = {
  // 基础线条材质
  LineBasicMaterial: new THREE.LineBasicMaterial({
    color: 0x049ef4,
    linewidth: 1,
    linecap: 'round',
    linejoin: 'round',
  }),
  // 虚线材质
  LineDashedMaterial: new THREE.LineDashedMaterial({
    color: 0x049ef4,
    linewidth: 1,
    scale: 1,
    dashSize: 3,
    gapSize: 1,
  }),
  // 基础网格材质
  MeshBasicMaterial: new THREE.MeshBasicMaterial({
    color: 0x049ef4,
  }),
  // 深度网格材质
  MeshDepthMaterial: new THREE.MeshDepthMaterial({}),
  // 未知材质1
  MeshDistanceMaterial: new THREE.MeshDistanceMaterial({}),
  // Lambert网格材质
  MeshLambertMaterial: new THREE.MeshLambertMaterial({}),
};

export default materialList;
