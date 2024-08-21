"use client";

import { useEffect, useState, useContext, createContext } from 'react';
import * as Fabric from "fabric";

const CanvasContext = createContext();

export const useCanvas = () => useContext( CanvasContext );

const Canvas = ( { children } ) => {

  const [ canvas, setCanvas ] = useState( null );
  const [ fabricCanvas, setFabricCanvas ] = useState( null );

  useEffect( () => {

    if ( canvas ) {
      setFabricCanvas( new Fabric.Canvas( canvas, {
        backgroundColor: "#dddddd",
        width: 500
      } ) );
    }

  }, [ canvas ] );


  return (
    <CanvasContext.Provider value={ { canvas, setCanvas, fabricCanvas } }>
      { children }
    </CanvasContext.Provider>
  );

};

export default Canvas;