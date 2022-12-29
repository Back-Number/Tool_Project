import React, { useEffect, useState } from 'react';
import { StreamLink } from '../../../../utils/streamUtils';

const token = 'bd44321510054f37b94311beb509250b';
const text = `乌云在我们心里搁下一块阴影，我聆听沉寂已久的心情，清晰透明，就像美丽的风景，
总在回忆里才看得清，被伤透的心能不能够继续爱我！我用力牵起没温度的双手，过往温柔已经被时间上锁，只剩挥散不去的难过，
缓缓飘落的枫叶像思念，我点燃烛火温暖岁末的秋天，极光掠过天边，北风掠过想你的容颜，我把爱烧成了落叶，却换不回熟悉的那张脸`;

const StreamPlayDemo = (props: any) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const fetchOption = {
      headers: {
        'Content-Type': 'application/json',
        'X-NLS-Token': token,
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        appkey: 'V5SLLsA0aigGcnyq',
        text: `<speak><emotion category="happy" intensity="1">${text}</emotion></speak>`,
        token: token,
        format: 'mp3',
        sample_rate: 16000,
        voice: 'zhimi_emo',
        volume: 50,
        speech_rate: 0,
        pitch_rate: 0,
      }),
    };
    const streamLink = new StreamLink({
      url: '/ttsServer/stream/v1/tts',
      mimeTypes: 'audio/mpeg',
      option: fetchOption,
    });
    setUrl(streamLink.getResultByUrl());
    streamLink.startLink();
    console.log('解析结果', streamLink.getResultByUrl());
  }, []);

  return (
    <div>
      <audio src={url} autoPlay controls></audio>
    </div>
  );
};

export default StreamPlayDemo;
