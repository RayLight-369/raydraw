// import React, { useReducer } from 'react';
// import * as fabric from 'fabric';


// const Header = ( { selectedTool, setSelectedTool, canvas } ) => {

//   const [ TOOLS, dispatch ] = useReducer( ( state, action ) => {
//     switch ( action.type.toLowerCase() ) {

//       case "select": case "selection": {

//         setSelectedTool( "selection" );

//       }

//       case "rect": case "rectangle": {

//         setSelectedTool( "rectangle" );

//         let rect;

//         canvas?.on( "mouse:down", o => {



//         })

//       }

//     }
//   }, {
//     "Selection": {},
//     "Rectangle": {
//       selected: true
//     },
//     "Circle": {},
//     "Triangle": {}
//   } );

//   return (
//     <header className='fixed top-3 left-1/2 -translate-x-1/2 w-[70vw] p-[4.5px] px-[5.5px] rounded-lg  shadow-[0px_0px_0.9310142993927002px_0px_rgba(0,_0,_0,_0.17),_0px_0px_3.1270833015441895px_0px_rgba(0,_0,_0,_0.08),_0px_7px_14px_0px_rgba(0,_0,_0,_0.05)] flex items-center z-[999]'>
//       <div className="tools flex gap-[6px]">
//         { Object.entries( TOOLS ).map( ( [ key, val ] ) => (
//           <button key={ key } onClick={ () => {
//             dispatch( {
//               type: key
//             } );
//           } } className='w-[36px] h-full aspect-square flex items-center justify-center bg-violet-200 rounded-lg'>{ "+" }</button>
//         ) ) }
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useReducer } from 'react';
import * as fabric from 'fabric';

const Header = ( { selectedTool, setSelectedTool, canvas } ) => {

  const changeSelectable = ( val ) => {
    canvas.forEachObject( function ( obj ) {
      obj.selectable = val;
    } );
    canvas.renderAll();
  };

  const resetCurrentEvents = () => {
    canvas.off( "mouse:down" );
    canvas.off( "mouse:up" );
    canvas.off( "mouse:move" );
  };

  const [ TOOLS, dispatch ] = useReducer( ( state, action ) => {
    setSelectedTool( action.type.toLowerCase() );

    switch ( action.type.toLowerCase() ) {
      case "select":
      case "selection": {
        setSelectedTool( "selection" );
        canvas.isDrawingMode = false;
        canvas.selection = true;
        resetCurrentEvents();
        changeSelectable( true );

        return state;
      }
      case "rect":
      case "rectangle": {
        setSelectedTool( "rectangle" );
        canvas.isDrawingMode = false;
        canvas.selection = false;
        changeSelectable( false );
        resetCurrentEvents();

        const addRectangle = ( opt ) => {

          const pointer = canvas?.getPointer( opt.e );
          let origX = pointer.x, origY = pointer.y;

          const rect = new fabric.Rect( {
            left: origX,
            top: origY,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2,
            width: 0,
            height: 0,
            selectable: false,
            evented: false,
          } );

          canvas?.add( rect );

          const onMouseMove = ( opt ) => {
            // const pointer = canvas?.getPointer( opt.e );
            // rect.set( {
            //   width: pointer.x - rect.left,
            //   height: pointer.y - rect.top,
            // } );
            // canvas?.renderAll();
            var pointer = canvas?.getPointer( opt.e );
            if ( origX > pointer.x ) {
              rect.set( {
                left: Math.abs( pointer.x )
              } );
            }
            if ( origY > pointer.y ) {
              rect.set( {
                top: Math.abs( pointer.y )
              } );
            }

            rect.set( {
              width: Math.abs( origX - pointer.x )
            } );
            rect.set( {
              height: Math.abs( origY - pointer.y )
            } );
            canvas?.renderAll();
          };

          const onMouseUp = () => {
            rect.set( {
              selectable: true,
              evented: true,
            } );
            canvas?.off( 'mouse:move', onMouseMove );
            canvas?.off( 'mouse:up', onMouseUp );
          };

          canvas?.on( 'mouse:move', onMouseMove );
          canvas?.on( 'mouse:up', onMouseUp );
        };

        canvas?.on( 'mouse:down', addRectangle );

        return state;
      }
      case "circle": {
        setSelectedTool( "circle" );
        canvas.isDrawingMode = false;
        canvas.selection = false;
        changeSelectable( false );
        resetCurrentEvents();

        const addCircle = ( opt ) => {
          const pointer = canvas.getPointer( opt.e );
          let origX = pointer.x, origY = pointer.y;

          const circle = new fabric.Circle( {
            left: origX,
            top: origY,
            radius: 0,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2,
            selectable: false,
            evented: false,
          } );

          canvas.add( circle );

          const onMouseMove = ( opt ) => {
            const pointer = canvas.getPointer( opt.e );
            const radius = Math.sqrt( Math.pow( pointer.x - origX, 2 ) + Math.pow( pointer.y - origY, 2 ) ) / 2;

            circle.set( {
              left: origX - radius,
              top: origY - radius,
              radius: radius,
            } );
            canvas.renderAll();
          };

          const onMouseUp = () => {
            circle.set( {
              selectable: true,
              evented: true,
            } );
            canvas.off( 'mouse:move', onMouseMove );
            canvas.off( 'mouse:up', onMouseUp );
          };

          canvas.on( 'mouse:move', onMouseMove );
          canvas.on( 'mouse:up', onMouseUp );
        };

        canvas.on( 'mouse:down', addCircle );

        return state;
      }
      default:
        return state;
    }
  }, {
    "Selection": {
      appearance: (
        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 22 22" class="" fill="none" stroke-width="1.25"><g stroke="currentColor" stroke-linecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 6l4.153 11.793a0.365 .365 0 0 0 .331 .207a0.366 .366 0 0 0 .332 -.207l2.184 -4.793l4.787 -1.994a0.355 .355 0 0 0 .213 -.323a0.355 .355 0 0 0 -.213 -.323l-11.787 -4.36z"></path><path d="M13.5 13.5l4.5 4.5"></path></g></svg>
      )
    },
    "Rectangle": {
      appearance: (
        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect></g></svg>
      )
    },
    "Circle": {
      appearance: (
        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="9"></circle></g></svg>
      )
    }
  } );

  return (
    <header className='fixed top-3 left-1/2 -translate-x-1/2 w-[70vw] p-[4.5px] px-[5.5px] rounded-lg shadow-[0px_0px_0.9310142993927002px_0px_rgba(0,_0,_0,_0.17),_0px_0px_3.1270833015441895px_0px_rgba(0,_0,_0,_0.08),_0px_7px_14px_0px_rgba(0,_0,_0,_0.05)] flex items-center z-[999]'>
      <div className="tools flex gap-[6px]">
        { Object.entries( TOOLS ).map( ( [ key, val ] ) => (
          <button key={ key } title={ key } onClick={ () => {
            dispatch( { type: key } );
          } } className='w-[36px] h-full p-[10px] aspect-square flex items-center justify-center bg-violet-200 rounded-lg'>
            { val.appearance }
          </button>
        ) ) }
      </div>
    </header>
  );
};

export default Header;
