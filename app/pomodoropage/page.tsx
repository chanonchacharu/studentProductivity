"use client";

import { useState, useEffect } from "react";

const assignmentsData = [
  {
    id: 1,
    title: "AI Quiz",
    date: "2024-09-03",
    subject: "Introduction to AI",
    questions: [
      { id: 1, question: "What is AI?", completed: false },
      { id: 2, question: "Define supervised learning.", completed: false },
      { id: 3, question: "Explain neural networks.", completed: false },
    ],
  },
  {
    id: 2,
    title: "Machine Learning Project Due",
    date: "2024-09-05",
    subject: "Machine Learning Basics",
    questions: [
      { id: 1, question: "Data collection", completed: false },
      { id: 2, question: "Model training", completed: false },
      { id: 3, question: "Evaluation", completed: false },
    ],
  },
  {
    id: 3,
    title: "Deep Learning Assignment",
    date: "2024-09-10",
    subject: "Deep Learning Fundamentals",
    questions: [
      { id: 1, question: "What is deep learning?", completed: false },
      { id: 2, question: "Explain CNNs.", completed: false },
      { id: 3, question: "Discuss RNNs.", completed: false },
    ],
  },
  // Add more assignments as necessary...
];

export default function PomodoroPage() {
  const [time, setTime] = useState(25 * 60); // 25 minutes
  const [timerOn, setTimerOn] = useState(false);
  const [mode, setMode] = useState("pomodoro"); 
  const [tasks, setTasks] = useState<any[]>([]); // Task list now stores assignment objects
  const [completedTasks, setCompletedTasks] = useState<any[]>([]); // Completed tasks
  const [availableAssignments, setAvailableAssignments] = useState(assignmentsData); // Available assignment tasks

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (!timerOn && time !== 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [timerOn, time]);

  const handleStart = () => setTimerOn(true);
  const handleStop = () => setTimerOn(false);
  const resetTimer = () => {
    setTimerOn(false);
    if (mode === "pomodoro") setTime(25 * 60);
    if (mode === "shortBreak") setTime(5 * 60);
    if (mode === "longBreak") setTime(15 * 60);
  };

  const addTask = (assignment: any) => {
    setTasks((prevTasks) => [...prevTasks, assignment]);
    setAvailableAssignments((prev) => prev.filter((asg) => asg.id !== assignment.id));
  };

  const removeTask = (taskId: number) => {
    const taskToRemove = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setAvailableAssignments((prev) => [...prev, taskToRemove]); 
  };

  const toggleQuestionCompletion = (taskId: number, questionId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              questions: task.questions.map((question) =>
                question.id === questionId ? { ...question, completed: !question.completed } : question
              ),
            }
          : task
      )
    );
  };

  const isAssignmentComplete = (assignment: any) => {
    return assignment.questions.every((question: any) => question.completed);
  };

  const markTaskAsSubmitted = (taskId: number) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const getAssignmentDueCategory = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffInDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) return "Past Due";
    if (diffInDays === 0) return "Due Today";
    if (diffInDays <= 7) return "Due This Week";
    return "Due Later";
  };

  const categorizedAssignments = availableAssignments.reduce(
    (acc, assignment) => {
      const category = getAssignmentDueCategory(assignment.date);
      acc[category].push(assignment);
      return acc;
    },
    { "Due Today": [], "Due This Week": [], "Due Later": [], "Past Due": [] }
  );

  return (
    <div className="pomodoro-container" style={{ textAlign: "center", padding: "2rem", backgroundColor: "#db5f56" }}>
      <h1 style={{ color: "#fff" }}>Pomofocus</h1>

      <div className="modes">
        <button onClick={() => setMode("pomodoro")} style={mode === "pomodoro" ? { backgroundColor: "#f4a261" } : {}}>
          Pomodoro
        </button>
        <button onClick={() => setMode("shortBreak")} style={mode === "shortBreak" ? { backgroundColor: "#f4a261" } : {}}>
          Short Break
        </button>
        <button onClick={() => setMode("longBreak")} style={mode === "longBreak" ? { backgroundColor: "#f4a261" } : {}}>
          Long Break
        </button>
      </div>

      <div className="timer" style={{ margin: "2rem 0", fontSize: "5rem", color: "#fff" }}>
        {formatTime(time)}
      </div>

      {!timerOn ? (
        <button onClick={handleStart} style={{ padding: "1rem 2rem", fontSize: "1.5rem", backgroundColor: "#fff", color: "#db5f56" }}>
          Start
        </button>
      ) : (
        <button onClick={handleStop} style={{ padding: "1rem 2rem", fontSize: "1.5rem", backgroundColor: "#fff", color: "#db5f56" }}>
          Stop
        </button>
      )}

      <button
        onClick={resetTimer}
        style={{ marginLeft: "1rem", padding: "1rem 2rem", fontSize: "1.5rem", backgroundColor: "#fff", color: "#db5f56" }}
      >
        Reset
      </button>

      {/* Task List Section */}
      <div className="tasks" style={{ marginTop: "3rem", color: "#fff" }}>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ listStyle: "none", marginBottom: "1rem", backgroundColor: "#fff", color: "#db5f56", padding: "0.5rem" }}>
              <div>
                {task.subject} - {task.title}
                <ul>
                  {task.questions.map((question) => (
                    <li key={question.id} style={{ color: question.completed ? "green" : "red" }}>
                      <input
                        type="checkbox"
                        checked={question.completed}
                        onChange={() => toggleQuestionCompletion(task.id, question.id)}
                      />
                      {question.question}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => removeTask(task.id)}
                style={{ marginLeft: "1rem", padding: "0.5rem", backgroundColor: "#db5f56", color: "#fff" }}
              >
                Remove from Task
              </button>
              <button
                onClick={() => markTaskAsSubmitted(task.id)}
                disabled={!isAssignmentComplete(task)} // Only enabled if all questions are complete
                style={{
                  marginLeft: "1rem",
                  padding: "0.5rem",
                  backgroundColor: isAssignmentComplete(task) ? "#2a9d8f" : "gray",
                  color: "#fff",
                }}
              >
                Have you submitted?
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Completed Tasks Section */}
      <div className="completed-tasks" style={{ marginTop: "3rem", color: "#fff" }}>
        <h2>Completed Tasks</h2>
        <ul>
          {completedTasks.map((task) => (
            <li key={task.id} style={{ listStyle: "none", marginBottom: "1rem", backgroundColor: "#2a9d8f", color: "#fff", padding: "0.5rem" }}>
              {task.subject} - {task.title} (Submitted)
            </li>
          ))}
        </ul>
      </div>

      {/* Assignments Section */}
      <div className="assignments" style={{ marginTop: "3rem", color: "#fff" }}>
        <h2>Upcoming Assignments</h2>
        {["Due Today", "Due This Week", "Due Later", "Past Due"].map((category) => (
          <div key={category}>
            {categorizedAssignments[category].length > 0 && (
              <>
                <h3>{category}</h3>
                <ul>
                  {categorizedAssignments[category].map((assignment) => (
                    <li
                      key={assignment.id}
                      style={{
                        listStyle: "none",
                        marginBottom: "1rem",
                        backgroundColor: "#fff",
                        color: "#db5f56",
                        padding: "0.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {assignment.subject} - {assignment.title}
                        <br />
                        Due: {assignment.date}
                      </div>
                      <button
                        onClick={() => addTask(assignment)}
                        style={{ padding: "0.5rem", backgroundColor: "#db5f56", color: "#fff", marginLeft: "1rem" }}
                      >
                        Add to Task
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
