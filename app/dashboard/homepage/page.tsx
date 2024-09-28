"use client";

import React from "react";
import Head from "next/head";
import { CalendarToday, Timer } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Homepage: React.FC = () => {
  const router = useRouter();

  const goToCalendar = () => {
    router.push("/dashboard/calendar");
  };

  const goToPomodoro = () => {
    router.push("/dashboard/pomodoropage");
  };

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Productivity App - Home</title>
      </Head>

      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold">
          Welcome to Your Productivity Dashboard
        </h1>
        <p className="text-lg">Overview of your tasks, schedule, and more!</p>
      </header>

      <main className="p-8">
        {/* Today's Tasks Section */}
        <section className="mb-8">
          <h2 className="text-gray-800 text-2xl font-semibold">
            Today’s Tasks
          </h2>
          {/* Map through tasks */}
        </section>

        {/* ADHD Restrainer Section */}
        <div className="mb-8 bg-[#bb4849] p-6 rounded-lg">
          <h1 className="text-4xl font-bold text-white">ADHD Restrainer</h1>

          <div className="flex gap-10 my-6 justify-center">
            {/* Calendar Icon */}
            <div
              className="bg-[#c47070] text-center p-4 rounded-lg cursor-pointer hover:bg-[#d16565] transition-all"
              onClick={goToCalendar}
            >
              <CalendarToday style={{ fontSize: 100, color: "white" }} />
              <p className="text-xl mt-4 text-white">Calendar</p>
            </div>

            {/* Pomodoro Icon */}
            <div
              className="bg-[#c47070] text-center p-4 rounded-lg cursor-pointer hover:bg-[#d16565] transition-all"
              onClick={goToPomodoro}
            >
              <Timer style={{ fontSize: 100, color: "white" }} />
              <p className="text-xl mt-4 text-white">Pomodoro</p>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines Section */}
        <section className="mb-8">
          <h2 className="text-gray-800 text-2xl font-semibold">
            Upcoming Deadlines
          </h2>
          {/* Map through deadlines */}
        </section>

        {/* Weekly Summary Section */}
        <section>
          <h2 className="text-gray-800 text-2xl font-semibold">
            Weekly Summary
          </h2>
          {/* Summary of tasks, focus areas, etc. */}
        </section>
      </main>
    </div>
  );
};

export default Homepage;
