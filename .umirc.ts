import { defineConfig } from 'umi';
import { resolve } from 'path';
import routeList from './src/common/routers';
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

export default defineConfig({
  title: 'BackNumber-authorTool',
  qiankun: {
    slave: {},
  },

  // 配置glft导入
  chainWebpack(config) {
    config.module
      .rule('glft')
      .test(/\.(glft)$/)
      .use('')
      .loader('url-loader')
      .options({})
      .end();
    // 开启包体分析
    config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [{}]);
    // 开启时间分析
    config.plugin('SpeedMeasurePlugin').use(SpeedMeasurePlugin, [{}]);
    config.optimization.minimize(true);
    config.optimization.usedExports(true);
    config.optimization.sideEffects(true);
  },

  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  // mfsu: {},
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
