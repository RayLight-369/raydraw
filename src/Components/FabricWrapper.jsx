import React, { useEffect, useRef } from 'react';

const FabricWrapper = ( { setCanvas } ) => {

  useEffect( () => {
    setCanvas( document.querySelector( "canvas#c1" ) );
  }, [] );

  return <canvas id='c1' />;
};

export default FabricWrapper;