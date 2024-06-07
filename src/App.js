import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const [startTime, setStartTime] = useState(null);
  const [counter, setCounter] = useState(null);

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

  useEffect(() => {
    if (!!startTime)
      count();
  }, [startTime]);

  return (
    <div className='stopwatch'>
      {hour}:{minute}:{second}
      <div>
        {!startTime && !counter && <button onClick={start}>Start</button>}
        {!!startTime && !counter && <button onClick={resume}>resume</button>}
        {!!startTime && !!counter && <button onClick={pause}>Pause</button>}
      </div>
    </div>
  );
}

export default App;
