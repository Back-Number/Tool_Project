import * as THREE from 'three';

// 材质列表
export const materialList = (name: string, option?: Object) => {
  switch (name) {
    case 'LineBasicMaterial':
      // 基础线条材质
      return new THREE.LineBasicMaterial({
        color: 0x049ef4,
        linewidth: 1,
        linecap: 'round',
        linejoin: 'round',
        ...option,
      });
    case 'LineDashedMaterial':
      // 虚线材质
      return new THREE.LineDashedMaterial({
        color: 0x049ef4,
        linewidth: 1,
        scale: 1,
        dashSize: 3,
        gapSize: 1,
        ...option,
      });
    case 'MeshBasicMaterial':
      // 基础网格材质
      return new THREE.MeshBasicMaterial({
        color: 0x049ef4,
        ...option,
      });
    case 'MeshDepthMaterial':
      // 深度网格材质
      return new THREE.MeshDepthMaterial({});
    case 'MeshDistanceMaterial':
      // unkonw
      return new THREE.MeshDistanceMaterial({});
    case 'MeshLambertMaterial':
      // Lambert网格材质
      return new THREE.MeshLambertMaterial({});
    default:
      console.log('生成了默认材质');
      return new THREE.MeshLambertMaterial({});
  }
};

// 获取GUI控件配置列表
export const getGuiOptionList = (name: string) => {
  switch (name) {
    case 'LineBasicMaterial':
      // 基础线条材质
      return {
        optionObject: {
          color: 0x049ef4,
          linewidth: 1,
          linecap: 'round',
          linejoin: 'round',
        },
        config: [
          {
            name: 'color',
            configOption: [],
          },
          {
            name: 'linewidth',
            configOption: [1, 20, 1],
          },
          {
            name: 'linecap',
            configOption: [['butt', 'round', 'square']],
          },
          {
            name: 'linejoin',
            configOption: [['round', 'bevel', 'miter']],
          },
        ],
      };
    default:
      // 基础线条材质
      return {
        optionObject: {},
        config: [],
      };
    // case 'LineDashedMaterial':
    // // 虚线材质

    // case 'MeshBasicMaterial':
    // // 基础网格材质

    // case 'MeshDepthMaterial':
    //   // 深度网格材质
    //   return new THREE.MeshDepthMaterial({});
    // case 'MeshDistanceMaterial':
    //   // unkonw
    //   return new THREE.MeshDistanceMaterial({});
    // case 'MeshLambertMaterial':
    //   // Lambert网格材质
    //   return new THREE.MeshLambertMaterial({});
    // default:
    //   console.log('生成了默认材质');
    //   return new THREE.MeshLambertMaterial({});
  }
};
