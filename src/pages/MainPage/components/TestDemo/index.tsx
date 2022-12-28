import React, { useEffect, useState } from 'react';

const TestDemo = (props: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const btn = document.getElementById('btn');
    if (btn) {
      btn.addEventListener('click', handleClick);
    }
    return () => {
      if (btn) btn.removeEventListener('click', handleClick);
    };
  });

  const handleClick = () => {
    console.log(count);
    setCount(count + 1);
  };

  return (
    <div>
      <button id={'btn'}>点击</button>
    </div>
  );
};

export default TestDemo;
