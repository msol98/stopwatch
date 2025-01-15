import { useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { resume, start, pause, lap, reset } from './actions/stopwatch';

function App({ dispatch, _startTime, _records }) {

  const [second, setSecond] = useState(null);
  const [minute, setMinute] = useState(null);
  const [hour, setHour] = useState(null);
  const [counter, setCounter] = useState(null);

  function startCounter() {
    const _counter = setInterval(count, 1000);
    setCounter(_counter);
  }

  function stopCounter() {
    clearInterval(counter);
    setCounter(null);
  }

  function count() {
    let now = new Date();
    var _second, _minute, _hour;
    const passedSeconds = now.getSeconds() - _startTime.getSeconds();
    _second = (second + (passedSeconds >= 0 ? passedSeconds : passedSeconds + 60));
    setSecond(_second);

    if (passedSeconds === 0) {
      const passedMinutes = now.getMinutes() - _startTime.getMinutes();
      _minute = (minute + (passedMinutes >= 0 ? passedMinutes : passedMinutes + 60));
      setMinute(_minute);

      if (passedMinutes === 0) {
        const passedHours = now.getHours() - _startTime.getHours();
        _hour = (hour + passedHours);
        setHour(_hour);
      }
    }
  }

  function handleReset() {
    setHour(null);
    setMinute(null);
    setSecond(null);
    dispatch(reset());
  }

  function handlePause() {
    clearInterval(counter);
    setCounter(null);
    dispatch(pause());
  }

  function handleLap() {
    const newRec = (hour || '00') + ':' + (minute || '00') + ':' + (second || '00');
    dispatch(lap(newRec));
  }

  useEffect(() => {
    if (!!_startTime)
      startCounter();
    else
      stopCounter();
  }, [_startTime]);

  return (
    <>
      <div className='stopwatch flex items-center rounded-full justify-center'>
        <div>
          {hour || '00'}:{minute || '00'}:{second || '00'}
        </div>
        <div className='gap-4'>
          {!_startTime && !(second || minute || hour) && <button onClick={() => dispatch(start())}>Start</button>}
          {!_startTime && (second || minute || hour) && <button onClick={() => dispatch(resume())}>resume</button>}
          {!!_startTime && <button onClick={handlePause}>Pause</button>}
          {!!_startTime && <button onClick={handleLap}>Lap</button>}
          <button onClick={handleReset}>Reset</button>
        </div>

      </div>
      <div className='records'>
        {_records && _records.map(record => <p key={record}>{record}</p>)}
      </div>
    </>
  );
}

const mapStateToProps = (state = { startTime: null }) => {
  return {
    _startTime: state.startTime,
    _records: state.records
  }
}

export default connect(mapStateToProps)(App);
