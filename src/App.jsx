import { useEffect, useReducer, useRef } from 'react';
import './App.css';

//initalState
const initialState = {
  isRunning: false,
  time: 0
}


//funktionReducer
const reducerFunk = (info, action) => {
  switch (action.type) {
    case 'start':
      return { ...info, isRunning: true };
    case 'stop':
      return { ...info, isRunning: false };
    case "reset":
      return { isRunning: false, time: 0 };
    case 'tick':
      return { ...info, time: info.time + 1 }
    default:
      throw new Error();
  }
}


function App() {
  //satate Reducer
  const [wert, dispatch] = useReducer(reducerFunk, initialState);
  const idRef = useRef(0)

  //useEffect
  useEffect(() => {

    //
    if (!wert.isRunning) {
      return;
    }

    //
    idRef.current = setInterval(() => dispatch({ type: 'tick' }), 1000)

    //
    return () => {
      clearInterval(idRef.current);
      idRef.current = 0;
    }


  }, [wert.isRunning])


  return (
    <div className="App">

      <div className='box'>
        {wert.time}

        <div>
          <button onClick={() => dispatch({ type: 'start' })}>Start</button>
          <button onClick={() => dispatch({ type: 'stop' })}>Stop</button>
          <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>

      </div>


    </div>
  );
}

export default App;
