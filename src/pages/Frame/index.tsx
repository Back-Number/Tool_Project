import React, { useEffect } from 'react';

import token from './config';

const Frame = (props: any) => {
  useEffect(() => {
    getAudio();
  });

  // 获取音频文件
  const getAudio = () => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: `access_token=${token}&domain=1&language=zh&voice_name=Jiaojiao&text=今天你过得还可以吗`,
    };

    AudioContextRequest(option);
  };

  // 采用AudioContext的方式（也涵盖了自动播放策略）
  const AudioContextRequest = async (option: object) => {
    const audioContext = new AudioContext({ latencyHint: 'balanced' });
    const data = await getAudioData(option);
    const decodeData = await audioContext.decodeAudioData(data);

    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = decodeData;
    sourceNode.connect(audioContext.destination);
    sourceNode.start(0);
  };

  // 请求获取音频资源
  const getAudioData = async (option: object) => {
    return window.fetch('https://openapi.data-baker.com/tts', option).then((res) => {
      return res.arrayBuffer();
    });
  };

  return (
    <div>
      <span>这是一个iframe</span>
    </div>
  );
};

export default Frame;
