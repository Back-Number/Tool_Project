import { defineConfig } from 'umi';
import { resolve } from 'path';
import routeList from './src/common/routers';

export default defineConfig({
  title: 'BackNumber-authorTool',
  qiankun: {
    slave: {},
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
