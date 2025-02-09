import './App.css';
import useTimer from './useTimer';

function App() {
  const { days, hours, minutes, seconds } = useTimer({
    initialDays: 10,
    initialHours: 5,
    initialMinutes: 30,
    initialSeconds: 0,
    onDayChange: () => {
      console.log("Day changed");
    },
    onHourChange: () => {
      console.log("Hour changed");
    },
    onMinuteChange: () => {
      console.log("Minute changed");
    },
    onSecondChange: () => {
      console.log("Second changed");
    }
  });

  return (
    <div className="App">
      <p>
        {days} days {hours} hours {minutes} minutes {seconds} seconds
      </p>
    </div>
  )
}

export default App
