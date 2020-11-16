import React, { useEffect, useState } from 'react';

export default ({ date }) => {
  const [time, setTime] = useState('seconds ago');
  function Timing() {
    const msMin = 60 * 1000;
    const msH = msMin * 60;
    const msD = msH * 24;
    const msW = msD * 7;
    const msMon = msD * 30;
    const now = new Date();
    const then = new Date(date || null);
    const dif = now.getTime() - then.getTime();
    if (dif < msMin) {
      setTime('seconds ago');
    } else if (dif < msH) {
      setTime(Math.round(dif / msMin) + ' minute(s) ago');
    } else if (dif < msD) {
      setTime(Math.round(dif / msH) + ' hour(s) ago');
    } else if (dif < msW) {
      setTime(Math.round(dif / msD) + ' day(s) ago');
    } else if (dif < msMon) {
      setTime(Math.round(dif / msW) + ' week(s) ago');
    } else if (now.getFullYear() === then.getFullYear()) {
      setTime(
        new Date(date).toLocaleDateString('en-GB', {
          month: 'long',
          day: 'numeric',
        })
      );
    } else {
      setTime(
        new Date(date).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );
    }
  }
  useEffect(() => {
    Timing();
    setInterval(Timing, 60000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span>{time}</span>;
};
