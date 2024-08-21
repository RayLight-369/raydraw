"use client";

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FabricWrapper from '../Components/FabricWrapper';
import * as fabric from 'fabric'; // v6
import Header from '../Components/Header';

// const ExcalidrawWrapper = dynamic(
//   async () => ( await import( "../Components/ExcalidrawWrapper" ) ).default,
//   {
//     ssr: false,
//   },
// );

const GraphingCalculator = dynamic(
  async () => ( await import( '../Components/Desmos' ) ).default,
  {
    ssr: false,
  },
);

const ExcalidrawWithDesmos = () => {
  // const [ excalidrawAPI, setExcalidrawAPI ] = useState( null );
  const [ desmosClose, setDesmosClose ] = useState( true );

  const CanvasElement = useRef( null );
  const Canvas = useRef( null );
  const [ CANVAS, setCanvas ] = useState( null );

  const [ selectedTool, setSelectedTool ] = useState( "selection" );





  useEffect( () => {

    const canvas = new fabric.Canvas( CanvasElement.current, {
      backgroundColor: "white",
      width: window.innerWidth,
      height: window.innerHeight
    } );

    Canvas.current = canvas;
    setCanvas( canvas );

    return () => {
      canvas.dispose();
    };

  }, [] );

  const onGraphImageAdded = ( thumbnail ) => {

    console.log( 1 );
    fabric.FabricImage.fromURL( thumbnail ).then( img => {
      img.scale( .5 );
      CANVAS.add( img );
      CANVAS.renderAll();
    } );

  };

  return (
    <>
      <Header selectedTool={ selectedTool } setSelectedTool={ setSelectedTool } canvas={ CANVAS } openDesmos={ () => setDesmosClose( false ) } />
      <canvas ref={ CanvasElement } />
      { !desmosClose && <GraphingCalculator onGraphImageAdded={ onGraphImageAdded } onClose={ () => setDesmosClose( true ) } /> }

    </>
  );
};

export default ExcalidrawWithDesmos;
