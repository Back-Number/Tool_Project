import { defineConfig } from 'umi';
import { resolve } from 'path';
import routeList from './src/common/routers';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

export default defineConfig({
  title: 'BackNumber-authorTool',
  // 启用webpack5（默认启用了缓存）
  // webpack5: {},

  // 配置glft导入
  chainWebpack(config) {
    config.module
      .rule('glft')
      .test(/\.(glb|gltf)$/)
      .use('url-loader')
      .loader('url-loader')
      .end();
    config.module
      .rule('mp3')
      .test(/\.(mp3)$/)
      .use('file-loader')
      .loader('file-loader')
      .end();

    // 开启包体分析
    // config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [{}]);
    // 开启时间分析
    // config.plugin('SpeedMeasurePlugin').use(SpeedMeasurePlugin, [{}]);
    // 开启打包裁剪压缩优化（但时间反而变多了？）
    // config.optimization.minimize(true);
    // config.optimization.usedExports(true);
    // config.optimization.sideEffects(true);
  },

  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  alias: {
    '@components': resolve(__dirname, './src/components'),
    '@utils': resolve(__dirname, './src/utils'),
    '@assets': resolve(__dirname, './src/assets'),
    '@routes': resolve(__dirname, './src/pages'),
    '@common': resolve(__dirname, './src/common'),
    '@services': resolve(__dirname, './src/services'),
  },
  routes: routeList,
  fastRefresh: {},
  //配置代理
  proxy: {
    '/baseline': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      pathRewrite: { '^/baseline': '' },
    },
  },
});
