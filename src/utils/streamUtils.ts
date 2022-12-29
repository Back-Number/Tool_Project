interface featchOption {
  method?: string;
  mode?: string;
  cache?: string;
  credentials?: string;
  headers?: Object;
  redirect?: string;
  referrerPolicy?: string;
  body?: any;
}

interface initOption {
  url: string;
  option?: featchOption;
  mimeTypes: string;
}

class StreamLink {
  url: string; // fetch请求地址
  bufferList: BufferSource[]; // 缓冲区
  mediaSource: MediaSource; // 解析器
  sourceBuffer: SourceBuffer | undefined;
  option: any; // fetch请求参数
  mimeTypes: string; // 流式传输资源类型
  isDone: boolean;
  isReady: boolean;

  constructor(data: initOption) {
    const { url, option = {}, mimeTypes } = data;
    this.url = url;
    this.bufferList = [];
    this.mediaSource = new MediaSource();
    this.option = option;
    this.mimeTypes = mimeTypes;
    this.sourceBuffer = undefined;
    this.isDone = false;
    this.isReady = true;
  }

  // 获取结果
  getResultByUrl() {
    return URL.createObjectURL(this.mediaSource);
  }

  // 开始传输
  startLink() {
    if (!window.fetch) {
      throw new Error('你的浏览器暂不支持fetch请求');
    }
    this.validatorOption();
    if (this.mediaSource.readyState === 'open') {
      this.initLink();
    } else {
      this.mediaSource.addEventListener('sourceopen', () => {
        this.initLink();
      });
    }
  }

  // 请求并传输
  initLink() {
    try {
      this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeTypes);
      this.sourceBuffer.addEventListener('updateend', () => {
        if (this.bufferList.length !== 0) {
          console.log('缓冲区输出》》》》》');
          this.sourceBuffer?.appendBuffer(this.bufferList.shift() as BufferSource);
        } else {
          if (this.isDone) {
            console.log('关闭流式传输');
            this.sourceBuffer?.abort();
            this.mediaSource.endOfStream();
          } else {
            this.isReady = true;
          }
        }
      });
    } catch (err) {
      console.error('错误的MIME类型!', err);
    }
    window
      .fetch(this.url, this.option)
      .then((res) => {
        if (!res.ok) {
          throw new Error('网络请求失败');
        }
        if (res.body) {
          const reader = res.body.getReader();
          const processRead = async (option: any) => {
            const { done, value } = option;
            if (!done) {
              if (this.isReady) {
                console.log('直接读取');
                this.sourceBuffer?.appendBuffer(value);
                this.isReady = false;
              } else {
                console.log('输入缓冲区《《《《《');
                this.bufferList = [...this.bufferList, value];
              }
              await reader.read().then(processRead);
            } else {
              console.log('解析完成');
              this.isDone = true;
            }
          };
          reader.read().then(processRead);
        }
      })
      .catch((err) => {
        console.error('startLink error!', err);
      });
  }

  // 参数检查
  validatorOption() {
    if (Object.prototype.toString.call(this.option) !== '[object Object]') {
      this.option = {};
    }
  }
}

export { StreamLink };
