import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import styles from './styles.less';

const FileDemo = (props: any) => {
  const [url, setUrl] = useState<ArrayBuffer | null | string>(null);
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null | string>(null);

  useEffect(() => {
    console.log('读取完成', arrayBuffer);
  }, [arrayBuffer]);

  // 文件上传完成
  const fileLoad = (event: any) => {
    const file = event.target.files[0];
    console.log('载入完成', file);
    const reader = new FileReader();
    reader.onload = function (res) {
      setArrayBuffer(this.result);
    };

    // 文本读取
    // reader.readAsText(file);

    // 正常读取
    // reader.readAsDataURL(file);

    // 二进制字符串
    // reader.readAsBinaryString(file);

    // 字节数组读取
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={styles['main']}>
      <div className={styles['input-wrapper']}>
        <input type="file" onChange={fileLoad}></input>
        {/* {url && <img src={String(url)}></img>} */}
        {/* {url ? <audio src={String(url)} controls></audio> : null} */}
        {/* {url ? <video src={String(url)} controls></video> : null} */}
      </div>
    </div>
  );
};

export default FileDemo;
