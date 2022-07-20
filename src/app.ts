export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('子应用初始化', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('子应用已挂载', props);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('子应用已卸载', props);
  },
};
