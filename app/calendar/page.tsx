// app/dashboard/calendar.tsx
"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const classesData = [
    { id: 1, title: "Introduction to AI", start: "2024-09-01T08:00:00", end: "2024-09-01T09:00:00", location: "10 / 1001" },
    { id: 2, title: "Machine Learning Basics", start: "2024-09-02T09:30:00", end: "2024-09-02T10:30:00", location: "12 / 2001" },
    { id: 3, title: "Deep Learning Fundamentals", start: "2024-09-03T11:00:00", end: "2024-09-03T12:00:00", location: "15 / 3002" },
    { id: 4, title: "Neural Networks", start: "2024-09-05T14:00:00", end: "2024-09-05T15:00:00", location: "18 / 1003" },
    { id: 5, title: "Natural Language Processing", start: "2024-09-10T10:00:00", end: "2024-09-10T11:00:00", location: "11 / 2002" },
    { id: 6, title: "Computer Vision", start: "2024-09-15T12:00:00", end: "2024-09-15T13:00:00", location: "13 / 3001" },
    { id: 7, title: "Advanced AI Topics", start: "2024-10-01T08:00:00", end: "2024-10-01T09:00:00", location: "14 / 1002" },
    { id: 8, title: "Reinforcement Learning", start: "2024-10-05T09:30:00", end: "2024-10-05T10:30:00", location: "16 / 2003" },
    { id: 9, title: "AI Ethics", start: "2024-10-10T11:00:00", end: "2024-10-10T12:00:00", location: "17 / 3003" },
    { id: 10, title: "AI for Robotics", start: "2024-10-12T14:00:00", end: "2024-10-12T15:00:00", location: "19 / 1001" },
    { id: 11, title: "AI System Design", start: "2024-10-20T10:00:00", end: "2024-10-20T11:00:00", location: "20 / 2001" },
    { id: 12, title: "AI in Healthcare", start: "2024-10-25T12:00:00", end: "2024-10-25T13:00:00", location: "10 / 3001" },
  ];
  
  
  const assignmentsData = [
  { id: 1, title: "AI Quiz", date: "2024-09-03", subject: "Introduction to AI" },
  { id: 2, title: "Machine Learning Project Due", date: "2024-09-05", subject: "Machine Learning Basics" },
  { id: 3, title: "Deep Learning Assignment", date: "2024-09-10", subject: "Deep Learning Fundamentals" },
  { id: 4, title: "Neural Networks Midterm", date: "2024-09-15", subject: "Neural Networks" },
  { id: 5, title: "NLP Project", date: "2024-09-20", subject: "Natural Language Processing" },
  { id: 6, title: "Computer Vision Final", date: "2024-09-25", subject: "Computer Vision" },
  { id: 7, title: "Advanced AI Exam", date: "2024-10-01", subject: "Advanced AI Topics" },
  { id: 8, title: "Reinforcement Learning Presentation", date: "2024-10-05", subject: "Reinforcement Learning" },
  { id: 9, title: "AI Ethics Research Paper", date: "2024-10-10", subject: "AI Ethics" },
  { id: 10, title: "AI for Robotics Midterm", date: "2024-10-12", subject: "AI for Robotics" },
  { id: 11, title: "AI System Design Final Project", date: "2024-10-20", subject: "AI System Design" },
  { id: 12, title: "AI in Healthcare Final Report", date: "2024-10-25", subject: "AI in Healthcare" },
];


export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const classesForSelectedDate = classesData.filter(
    (cls) => cls.start.slice(0, 10) === selectedDate
  );
  const assignmentsForSelectedDate = assignmentsData.filter(
    (asg) => asg.date === selectedDate
  );

  return (
    <div
      className="calendar-page"
      style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>School Calendar</h1>

      {/* FullCalendar Component */}
      <div className="calendar-grid" style={{ marginBottom: "2rem" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[...classesData, ...assignmentsData]}
          dateClick={(arg) => {
            setSelectedDate(arg.dateStr);
          }}
          height={500}
        />
      </div>

      {/* Section for Classes */}
      <div className="section-classes" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            borderBottom: "2px solid #db5f56",
            paddingBottom: "0.5rem",
          }}
        >
          Classes for {selectedDate}
        </h2>
        {classesForSelectedDate.length > 0 ? (
          <ul style={{ padding: "0", listStyleType: "none" }}>
            {classesForSelectedDate.map((classInfo) => (
              <li
                key={classInfo.id}
                style={{
                  backgroundColor: "#f4a261",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem 0" }}>{classInfo.title}</h3>
                <p style={{ margin: "0" }}>
                  Time: {formatTime(classInfo.start)} - {formatTime(classInfo.end)}
                </p>
                <p style={{ margin: "0" }}>Location: {classInfo.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No classes scheduled for this day.</p>
        )}
      </div>

      {/* Section for Assignments */}
      <div className="section-assignments">
        <h2
          style={{
            borderBottom: "2px solid #db5f56",
            paddingBottom: "0.5rem",
          }}
        >
          Upcoming Assignments for {selectedDate}
        </h2>
        {assignmentsForSelectedDate.length > 0 ? (
          <ul style={{ padding: "0", listStyleType: "none" }}>
            {assignmentsForSelectedDate.map((assignment) => (
              <li
                key={assignment.id}
                style={{
                  backgroundColor: "#2a9d8f",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem 0" }}>
                  {assignment.subject} - {assignment.title}
                </h3>
                <p style={{ margin: "0" }}>Due: {assignment.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments due on this day.</p>
        )}
      </div>
    </div>
  );
}

function formatTime(dateTimeStr: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(dateTimeStr);
  return date.toLocaleTimeString([], options);
}
