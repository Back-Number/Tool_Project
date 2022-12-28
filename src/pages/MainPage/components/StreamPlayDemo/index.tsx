import React, { useState, useEffect } from 'react';
import { clone, cloneDeep } from 'lodash';

import styles from './styles.less';

const text = `乌云在我们心里搁下一块阴影，我聆听沉寂已久的心情，清晰透明，就像美丽的风景，
总在回忆里才看得清，被伤透的心能不能够继续爱我！我用力牵起没温度的双手，过往温柔已经被时间上锁，只剩挥散不去的难过，
缓缓飘落的枫叶像思念，我点燃烛火温暖岁末的秋天，极光掠夺天边，北风掠过想你的容颜，我把爱烧成了落叶，却换不回熟悉的那张脸`;

const token = '876f7d12bde14af499c65f4ba61f187a';

const StreamPlayDemo = (props: any) => {
  const [mediaSource, setMediaSource] = useState(new MediaSource());
  const [BufferInstanche, setBufferInstance] = useState<undefined | SourceBuffer>();
  const [bufferList, setBufferList] = useState<BufferSource[]>([]); // 缓冲区
  const [isReady, setIsReady] = useState<boolean>(true);
  const [isDone, setIsDone] = useState<boolean>(false); // 缓冲区是否写入完成
  const [url, setUrl] = useState<string>(URL.createObjectURL(mediaSource));

  useEffect(() => {
    mediaSource.addEventListener('sourceopen', getResource);
  }, []);

  useEffect(() => {
    if (isReady && BufferInstanche) {
      if (bufferList.length > 0) {
        try {
          console.log('缓冲区输出》》》》》》');
          let copyList = cloneDeep(bufferList);
          BufferInstanche.appendBuffer(copyList.shift() as BufferSource);
          setBufferList(copyList);
          setIsReady(false);
        } catch (err) {
          console.log('缓冲区输出错误', err);
        }
      } else if (!bufferList.length && isDone) {
        console.log('解析结束，结束流式传输');
        BufferInstanche.abort();
        mediaSource.endOfStream();
      }
    }
  }, [isReady, bufferList]);

  // 获取音频文件
  const getResource = () => {
    const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
    sourceBuffer.addEventListener('updateend', () => {
      console.log('读取完成，准备再次读取');
      setIsReady(true);
    });
    setBufferInstance(sourceBuffer);

    // 请求体
    const params = {
      appkey: 'V5SLLsA0aigGcnyq',
      text: `<speak><emotion category="happy" intensity="1">${text}</emotion></speak>`,
      token: token,
      format: 'mp3',
      sample_rate: 16000,
      voice: 'zhimi_emo',
      volume: 50,
      speech_rate: 0,
      pitch_rate: 0,
    };

    // 请求参数
    const option = Object.assign({
      headers: {
        'Content-Type': 'application/json',
        'X-NLS-Token': token,
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(params),
    });

    try {
      window.fetch('/ttsServer/stream/v1/tts', option).then((res) => {
        if (res.body) {
          const reader = res.body.getReader();
          reader.read().then(async function processRead({ done, value }) {
            if (!done && value) {
              console.log('缓冲区输入《《《《《《');
              const copyBuffer = cloneDeep(bufferList);
              copyBuffer?.push(value);
              setBufferList(copyBuffer);
              ``;
              await reader.read().then(processRead);
            } else {
              setIsDone(true);
              console.log('可读流解析完成！！！');
            }
          });
        }
      });
    } catch (err) {
      console.log('错误捕获', err);
    }
  };

  return (
    <div className={styles['main']}>
      <div className={styles['input-wrapper']}></div>
      <audio controls autoPlay src={url}></audio>
    </div>
  );
};

export default StreamPlayDemo;
