import "./App.css";
import { useState } from "react";
import { TaskManager } from "./components/TaskManager";

function App() {
  const [fadeOf, setFadeOf] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const handleClick = () => {
    setFadeOf(!fadeOf);

    setTimeout(() => {
      setFadeIn(true);
    }, 1500);
  };
  return (
    <div className="App">
      <body className="App-body">
        {fadeIn ? <TaskManager /> : undefined}
        {!fadeIn ? (
          <>
            <div className="App-presentation">
              <h1>note keeper</h1>
              <p>An excellent choice if you want to manage your tasks</p>
              <button onClick={handleClick}>create new task</button>
            </div>
            <div
              className={`App-presentation-hide ${
                fadeOf ? "App-active" : undefined
              }`}
            />
          </>
        ) : undefined}
      </body>
    </div>
  );
}

export default App;
