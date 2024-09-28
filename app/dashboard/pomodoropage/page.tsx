"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";

const PomodoroPage: React.FC = () => {
  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds]);

  const togglePomodoro = () => {
    setIsActive(!isActive);
  };

  const resetPomodoro = () => {
    setSeconds(1500);
    setIsActive(false);
  };

  return (
    <div>
      <Head>
        <title>Productivity App - Pomodoro</title>
      </Head>
      <header>
        <h1>Pomodoro Timer</h1>
      </header>
      <main>
        <section>
          <h2>Focus Timer</h2>
          <div>
            <p>{`${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0" : ""}${
              seconds % 60
            }`}</p>
          </div>
          <button onClick={togglePomodoro}>
            {isActive ? "Pause" : "Start"}
          </button>
          <button onClick={resetPomodoro}>Reset</button>
        </section>
      </main>
    </div>
  );
};

export default PomodoroPage;
