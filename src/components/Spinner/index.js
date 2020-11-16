import React from 'react';
import './style.scss';

export default function ({ h = 100 }) {
  const height = typeof h === 'string' ? h : `${h}vh`;
  return (
    <div id='Spinner' style={{ height }}>
      <div className='spinner'>
        <div className='dot1'></div>
        <div className='dot2'></div>
      </div>
    </div>
  );
}
