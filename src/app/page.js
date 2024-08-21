"use client";

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FabricWrapper from '../Components/FabricWrapper';
import * as fabric from 'fabric'; // v6
import Header from '../Components/Header';
// import GraphingCalculator from '../Components/Desmos';

const ExcalidrawWrapper = dynamic(
  async () => ( await import( "../Components/ExcalidrawWrapper" ) ).default,
  {
    ssr: false,
  },
);

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

  const [ selectedTool, setSelectedTool ] = useState( "rectangle" );





  useEffect( () => {

    const canvas = new fabric.Canvas( CanvasElement.current, {
      backgroundColor: "white",
      width: window.innerWidth,
      height: window.innerHeight
    } );

    Canvas.current = canvas;
    setCanvas( canvas );

    canvas.add( new fabric.Rect( {
      width: 20,
      height: 20,
      fill: "red",
      left: 10,
      top: 10
    } ) );

    return () => {
      canvas.dispose();
    };

  }, [] );



  // const addImageToExcalidraw = ( src ) => {

  //   const sceneData = {
  //     elements: [
  //       {
  //         type: 'image',
  //         x: 100,
  //         y: 100,
  //         width: 200,
  //         height: 200,
  //         src
  //       }
  //     ]
  //   };

  //   excalidrawAPI?.updateScene( sceneData );
  // };
  // : import( '@excalidraw/excalidraw/types/types' ).SceneData
  const onGraphImageAdded = ( thumbnail ) => {

    // console.log( thumbnail );

    const id = Date.now();

    const imageElement = {
      type: 'image',
      version: 1,
      versionNonce: id,
      isDeleted: false,
      id,
      fillStyle: 'hachure',
      strokeWidth: 1,
      strokeStyle: 'solid',
      roughness: 1,
      opacity: 100,
      angle: 0,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      seed: 1,
      strokeColor: '#000000',
      backgroundColor: 'transparent',
      fileId: id,
      scale: [ 1, 1 ],
      groupIds: [],
      status: 'saved',
      file: thumbnail
    };

    excalidrawAPI.updateScene( {
      elements: [ ...excalidrawAPI.getSceneElements(), imageElement ],
      appState: excalidrawAPI.getAppState(),
      commitToHistory: true,
    } );

    excalidrawAPI.addFiles( [
      {
        mimeType: "image/png",
        dataURL: thumbnail,
        id: id,
        created: Date.now()
      }
    ] );

    // excalidrawAPI.addFiles( [ thumbnail ] );
  };

  return (
    <>
      <Header selectedTool={ selectedTool } setSelectedTool={ setSelectedTool } canvas={ CANVAS } />
      {/* <div className='flex w-full h-full'> */ }
      {/* <ExcalidrawWrapper elements={ elements } appState={ appState } setElements={ setElements } setAppState={ setAppState } setApi={ setExcalidrawAPI } openDesmos={ () => setDesmosClose( false ) } /> */ }
      <canvas ref={ CanvasElement } />
      {/* { !desmosClose && <GraphingCalculator onGraphImageAdded={ onGraphImageAdded } onClose={ () => setDesmosClose( true ) } /> } */ }

    </>
  );
};

export default ExcalidrawWithDesmos;
