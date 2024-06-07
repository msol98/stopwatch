import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const [startTime, setStartTime] = useState(null);
  const [counter, setCounter] = useState(null);
  const [records, setRecords] = useState([]);

  function count() {
    const _counter = setInterval(() => {
      let now = new Date();
      const passedSeconds = now.getSeconds() - startTime.getSeconds();
      setSecond(second + (passedSeconds >= 0 ? passedSeconds : passedSeconds + 60));

      if (passedSeconds === 0) {
        const passedMinutes = now.getMinutes() - startTime.getMinutes();
        setMinute(minute + (passedMinutes >= 0 ? passedMinutes : passedMinutes + 60));

        if (passedMinutes === 0) {
          const passedHours = now.getHours() - startTime.getHours();
          setHour(hour + passedHours);
        }
      }
    }, 1000);
    setCounter(_counter);
  }

  function start() {
    setStartTime(new Date());
  }

  function pause() {
    clearInterval(counter);
    setCounter(null);
  }

  function resume() {
    setStartTime(new Date());
  }

  function lap() {
    const newRec = hour + ':' + minute + ':' + second;
    setRecords(recs => [...recs, newRec]);
  }

  function reset() {
    setSecond(0);
    setMinute(0);
    setHour(0);
    setStartTime(null);
    setCounter(null);
  }

  useEffect(() => {
    if (!!startTime)
      count();
  }, [startTime]);

  return (
    <div className='stopwatch'>
      <div>
        {hour}:{minute}:{second}
      </div>
      <div>
        {!startTime && !counter && <button onClick={start}>Start</button>}
        {!!startTime && !counter && <button onClick={resume}>resume</button>}
        {!!startTime && !counter && <button onClick={reset}>Reset</button>}
        {!!startTime && !!counter && <button onClick={pause}>Pause</button>}
        {!!startTime && !!counter && <button onClick={lap}>Lap</button>}
      </div>
      <div className='records'>
        {records.map(record => <p>{record}</p>)}
      </div>
    </div>
  );
}

export default App;
