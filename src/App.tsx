import React, { useState, useCallback } from "react";
import workerScript from "./worker";
import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastNumber, setLastNumber] = useState(0);

  const countBigNumber = useCallback(() => {
    const t0 = performance.now();

    const myWorker = new Worker(workerScript);
    myWorker.postMessage(null);

    myWorker.onmessage = function (e) {
      const t1 = performance.now();

      console.log(
        "Call to countBigNumber took " + (t1 - t0) / 1000 + " seconds."
      );

      setLastNumber(e.data);
      setIsLoading(false);
    };
  }, []);

  const handleClickButton = () => {
    setIsLoading(true);
    countBigNumber();
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClickButton}>Click me</button>
        <div>{lastNumber}</div>
        {isLoading && <div className="loader" />}
      </header>
    </div>
  );
};

export default App;
