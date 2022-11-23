import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import styles from './styles.less';

const FileDemo = (props: any) => {
  const [url, setUrl] = useState<ArrayBuffer | null | string>(null);

  // 文件上传完成
  const fileLoad = (event: any) => {
    const file = event.target.files[0];
    console.log('载入完成', file);
    const reader = new FileReader();
    reader.onload = function (res) {
      console.log('读取完成', this);
      setUrl(this.result);
    };

    // 正常读取
    reader.readAsDataURL(file);

    //readAsBinaryString
    // reader.readAsBinaryString(file);

    //readAsArrayBuffer
    // reader.readAsArrayBuffer(file);
  };

  return (
    <div className={styles['main']}>
      <div className={styles['input-wrapper']}>
        <input type="file" onChange={fileLoad}></input>
        {url && <img src={String(url)}></img>}
      </div>
    </div>
  );
};

export default FileDemo;
