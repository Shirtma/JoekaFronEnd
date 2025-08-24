import React, { useEffect, useState } from 'react';
import OrderTakeout from './ordertakeout';

function TakeoutComponent() {
  const [storage, setStorage] = useState('');
  const [track, setTrack] = useState('');

  useEffect(() => {
    setTrack(storage);
  }, [storage]);

  return (
    <>
      <OrderTakeout
        storage={storage}
        setStorage={setStorage}
        track={track}
        setTrack={setTrack}
      />
    </>
  );
}

export default TakeoutComponent;
