import React, { useEffect } from 'react';

const testMusicDemo = require('../../assets/music/testMusicDemo.mp3');
const { fetch } = window;
const Frame = (props: any) => {
  useEffect(() => {
    console.log('导入结果', testMusicDemo);
    initMusic();
  });

  const initMusic = async () => {
    const proccessor = async (reader: ReadableStreamDefaultReader) => {
      let res: number[] = [];
      await reader.read().then(async function processRead({ done, value }) {
        if (done) {
          return res;
        }
        res = [...res, ...value];
        await reader.read().then(processRead);
      });
      return new Uint8Array(res);
    };

    await fetch(testMusicDemo.default).then(async (result) => {
      console.log('请求结果', result);
      if (result.status === 200 && result.body) {
        const reader = result.body.getReader();
        const resultUnit8Arr = await proccessor(reader);
        const audioContext = new AudioContext({ latencyHint: 'balanced' });
        const decodeData = await audioContext.decodeAudioData(resultUnit8Arr.buffer);
        const sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = decodeData;
        sourceNode.connect(audioContext.destination);
        sourceNode.start(0);
      }
    });
  };

  return (
    <div>
      <span>这是一个iframe,采用AudioContext进行播放</span>
    </div>
  );
};

export default Frame;
