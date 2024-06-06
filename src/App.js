import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const [startTime, setStartTime] = useState(null);

  function count() {
    setInterval(() => {
      let now = new Date();
      const passedSeconds = now.getSeconds() - startTime.getSeconds();
      setSecond(passedSeconds >= 0 ? passedSeconds : passedSeconds + 60);

      if (passedSeconds === 0) {
        const passedMinutes = now.getMinutes() - startTime.getMinutes();
        setMinute(passedMinutes >= 0 ? passedMinutes : passedMinutes + 60);

        if (passedMinutes === 0) {
          const passedHours = now.getHours() - startTime.getHours();
          setHour(passedHours);
        }
      }
    }, 1000);
  }

  function start() {
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
        {!startTime && <button onClick={start}>Start</button>}
      </div>
    </div>
  );
}

export default App;
