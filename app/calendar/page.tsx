// app/dashboard/calendar.tsx
"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const classesData = [
  {
    id: uuidv4(),
    title: "Introduction to AI",
    start: "2024-09-01T08:00:00",
    end: "2024-09-01T09:00:00",
    location: "10 / 1001",
  },
  {
    id: uuidv4(),
    title: "Machine Learning Basics",
    start: "2024-09-02T09:30:00",
    end: "2024-09-02T10:30:00",
    location: "12 / 2001",
  },
  {
    id: uuidv4(),
    title: "Deep Learning Fundamentals",
    start: "2024-09-03T11:00:00",
    end: "2024-09-03T12:00:00",
    location: "15 / 3002",
  },
  {
    id: uuidv4(),
    title: "Neural Networks",
    start: "2024-09-05T14:00:00",
    end: "2024-09-05T15:00:00",
    location: "18 / 1003",
  },
  {
    id: uuidv4(),
    title: "Natural Language Processing",
    start: "2024-09-10T10:00:00",
    end: "2024-09-10T11:00:00",
    location: "11 / 2002",
  },
  {
    id: uuidv4(),
    title: "Computer Vision",
    start: "2024-09-15T12:00:00",
    end: "2024-09-15T13:00:00",
    location: "13 / 3001",
  },
  {
    id: uuidv4(),
    title: "Advanced AI Topics",
    start: "2024-10-01T08:00:00",
    end: "2024-10-01T09:00:00",
    location: "14 / 1002",
  },
  {
    id: uuidv4(),
    title: "Reinforcement Learning",
    start: "2024-10-05T09:30:00",
    end: "2024-10-05T10:30:00",
    location: "16 / 2003",
  },
  {
    id: uuidv4(),
    title: "AI Ethics",
    start: "2024-10-10T11:00:00",
    end: "2024-10-10T12:00:00",
    location: "17 / 3003",
  },
  {
    id: uuidv4(),
    title: "AI for Robotics",
    start: "2024-10-12T14:00:00",
    end: "2024-10-12T15:00:00",
    location: "19 / 1001",
  },
  {
    id: uuidv4(),
    title: "AI System Design",
    start: "2024-10-20T10:00:00",
    end: "2024-10-20T11:00:00",
    location: "20 / 2001",
  },
  {
    id: uuidv4(),
    title: "AI in Healthcare",
    start: "2024-10-25T12:00:00",
    end: "2024-10-25T13:00:00",
    location: "10 / 3001",
  },
];

const assignmentsData = [
  {
    id: uuidv4(),
    title: "AI Quiz",
    date: "2024-09-03",
    subject: "Introduction to AI",
  },
  {
    id: uuidv4(),
    title: "Machine Learning Project Due",
    date: "2024-09-05",
    subject: "Machine Learning Basics",
  },
  {
    id: uuidv4(),
    title: "Deep Learning Assignment",
    date: "2024-09-10",
    subject: "Deep Learning Fundamentals",
  },
  {
    id: uuidv4(),
    title: "Neural Networks Midterm",
    date: "2024-09-15",
    subject: "Neural Networks",
  },
  {
    id: uuidv4(),
    title: "NLP Project",
    date: "2024-09-20",
    subject: "Natural Language Processing",
  },
  {
    id: uuidv4(),
    title: "Computer Vision Final",
    date: "2024-09-25",
    subject: "Computer Vision",
  },
  {
    id: uuidv4(),
    title: "Advanced AI Exam",
    date: "2024-10-01",
    subject: "Advanced AI Topics",
  },
  {
    id: uuidv4(),
    title: "Reinforcement Learning Presentation",
    date: "2024-10-05",
    subject: "Reinforcement Learning",
  },
  {
    id: uuidv4(),
    title: "AI Ethics Research Paper",
    date: "2024-10-10",
    subject: "AI Ethics",
  },
  {
    id: uuidv4(),
    title: "AI for Robotics Midterm",
    date: "2024-10-12",
    subject: "AI for Robotics",
  },
  {
    id: uuidv4(),
    title: "AI System Design Final Project",
    date: "2024-10-20",
    subject: "AI System Design",
  },
  {
    id: uuidv4(),
    title: "AI in Healthcare Final Report",
    date: "2024-10-25",
    subject: "AI in Healthcare",
  },
];

// Calendar Page Component
export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  // Filter events for the selected date
  const classesForSelectedDate = classesData.filter(
    (cls) => cls.start.slice(0, 10) === selectedDate
  );
  const assignmentsForSelectedDate = assignmentsData.filter(
    (asg) => asg.date === selectedDate
  );

  // State to manage calendar events (initial data includes classes and assignments)
  const [events, setEvents] = useState([
    ...classesData,
    ...assignmentsData.map((assignment) => ({
      id: assignment.id,
      title: `${assignment.subject} - ${assignment.title}`,
      start: `${assignment.date}T00:00:00`,
      end: `${assignment.date}T23:59:59`,
      allDay: true,
    })),
  ]);

  // State for new event form inputs
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "task", // Default type is task
  });

  // Handle form inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add a new event
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine date and time
    const dateTime = `${newEvent.date}T${newEvent.time}:00`;

    // Create the new event object
    const newCalendarEvent = {
      id: uuidv4(), // Unique ID for the event
      title: newEvent.title,
      start: dateTime,
      end: dateTime, // Since it's a task/reminder, start and end are the same
      allDay: false,
      type: newEvent.type,
    };

    // Add the new event to the calendar
    setEvents((prevEvents) => [...prevEvents, newCalendarEvent]);

    // Clear the form inputs
    setNewEvent({ title: "", date: "", time: "", type: "task" });
  };

  return (
    <div className="calendar-page p-8 bg-white min-h-screen">
    <nav className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
            {/* Links */}
            <div className="space-x-6">
            <Link href="/dashboard">
                <span className="hover:text-gray-300 cursor-pointer">Home</span>
            </Link>
            <Link href="/calendar">
                <span className="hover:text-gray-300 cursor-pointer">Calendar</span>
            </Link>
            <Link href="/pomodoropage">
                <span className="hover:text-gray-300 cursor-pointer">Pomodoro</span>
            </Link>
            </div>
        </div>
    </nav>
      <h1 className="text-center text-4xl font-bold mb-10 text-cyan-900">
        School Calendar
      </h1>

      {/* FullCalendar Component */}
      <div className="calendar-grid mb-10">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events} // Displaying events including the newly added ones
          height={500}
          dateClick={(arg) => {
            setSelectedDate(arg.dateStr);
          }}
        />
      </div>

      {/* Section for Classes */}
      <div className="section-classes mb-10">
        <h2 className="text-2xl font-semibold border-b-2 border-cyan-600 mb-4 pb-2 text-cyan-900">
          Classes for {selectedDate}
        </h2>
        {classesForSelectedDate.length > 0 ? (
          <ul className="space-y-4">
            {classesForSelectedDate.map((classInfo) => (
              <li
                key={classInfo.id}
                className="p-4 bg-cyan-500 rounded-lg shadow-md hover:bg-cyan-600 transition-all"
              >
                <h3 className="text-lg font-bold mb-2 text-white">
                  {classInfo.title}
                </h3>
                <p className="text-white">
                  Time: {formatTime(classInfo.start)} -{" "}
                  {formatTime(classInfo.end)}
                </p>
                <p className="text-white">Location: {classInfo.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No classes scheduled for this day.</p>
        )}
      </div>

      {/* Section for Assignments */}
      <div className="section-assignments mb-10">
        <h2 className="text-2xl font-semibold border-b-2 border-cyan-600 mb-4 pb-2 text-cyan-900">
          Upcoming Assignments for {selectedDate}
        </h2>
        {assignmentsForSelectedDate.length > 0 ? (
          <ul className="space-y-4">
            {assignmentsForSelectedDate.map((assignment) => (
              <li
                key={assignment.id}
                className="p-4 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                <h3 className="text-lg font-bold mb-2 text-white">
                  {assignment.subject} - {assignment.title}
                </h3>
                <p className="text-white">Due: {assignment.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments due on this day.</p>
        )}
      </div>

      {/* Add New Task/Reminder */}
      <div className="add-event-form mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-900">
          Add a Custom Task/Reminder
        </h2>
        <form
          onSubmit={handleAddEvent}
          className="flex flex-col space-y-4 max-w-md"
        >
          <div>
            <label htmlFor="title" className="block font-medium mb-1 text-cyan-900">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block font-medium mb-1 text-cyan-900">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block font-medium mb-1 text-cyan-900">
              Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={newEvent.time}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block font-medium mb-1 text-cyan-900">
              Type:
            </label>
            <select
              id="type"
              name="type"
              value={newEvent.type}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="task">Task</option>
              <option value="reminder">Reminder</option>
            </select>
          </div>
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

// Helper function to format time
function formatTime(dateTimeStr: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(dateTimeStr);
  return date.toLocaleTimeString([], options);
}
