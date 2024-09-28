"use client";

import { useState, useEffect } from "react";

const assignmentsData = [
    {
      id: 1,
      title: "AI Quiz",
      date: "2024-10-03",
      subject: "Introduction to AI",
      questions: [
        { id: 1, question: "What is Artificial Intelligence?", completed: false },
        { id: 2, question: "Explain the difference between narrow AI and general AI.", completed: false },
        { id: 3, question: "What are the ethical concerns related to AI?", completed: false },
      ],
    },
    {
      id: 2,
      title: "Machine Learning Project Due",
      date: "2024-11-05",
      subject: "Machine Learning Basics",
      questions: [
        { id: 1, question: "What are the different types of machine learning?", completed: false },
        { id: 2, question: "Explain supervised learning with an example.", completed: false },
        { id: 3, question: "What are common performance metrics for machine learning models?", completed: false },
      ],
    },
    {
      id: 3,
      title: "Deep Learning Assignment",
      date: "2024-11-10",
      subject: "Deep Learning Fundamentals",
      questions: [
        { id: 1, question: "What is a neural network?", completed: false },
        { id: 2, question: "Explain the concept of backpropagation.", completed: false },
        { id: 3, question: "How do convolutional neural networks (CNNs) work?", completed: false },
      ],
    },
    {
      id: 4,
      title: "Neural Networks Midterm",
      date: "2024-11-15",
      subject: "Neural Networks",
      questions: [
        { id: 1, question: "What is a perceptron, and how does it function?", completed: false },
        { id: 2, question: "Explain how multi-layer perceptrons differ from simple perceptrons.", completed: false },
        { id: 3, question: "What are activation functions, and why are they important?", completed: false },
      ],
    },
    {
      id: 5,
      title: "NLP Project",
      date: "2024-10-20",
      subject: "Natural Language Processing",
      questions: [
        { id: 1, question: "What is tokenization in NLP?", completed: false },
        { id: 2, question: "Explain the concept of word embeddings.", completed: false },
        { id: 3, question: "How does a transformer model improve NLP tasks?", completed: false },
      ],
    },
    {
      id: 6,
      title: "Computer Vision Final",
      date: "2024-11-25",
      subject: "Computer Vision",
      questions: [
        { id: 1, question: "What is the purpose of edge detection in computer vision?", completed: false },
        { id: 2, question: "Explain how convolution is applied in image processing.", completed: false },
        { id: 3, question: "What is image classification, and how does it work?", completed: false },
      ],
    },
    {
      id: 7,
      title: "Advanced AI Exam",
      date: "2024-10-01",
      subject: "Advanced AI Topics",
      questions: [
        { id: 1, question: "What are the limitations of current AI technologies?", completed: false },
        { id: 2, question: "Explain the concept of reinforcement learning.", completed: false },
        { id: 3, question: "How does explainable AI improve the transparency of AI systems?", completed: false },
      ],
    },
    {
      id: 8,
      title: "Reinforcement Learning Presentation",
      date: "2024-10-05",
      subject: "Reinforcement Learning",
      questions: [
        { id: 1, question: "What is the Markov decision process?", completed: false },
        { id: 2, question: "Explain the difference between Q-learning and SARSA.", completed: false },
        { id: 3, question: "What are some real-world applications of reinforcement learning?", completed: false },
      ],
    },
    {
      id: 9,
      title: "AI Ethics Research Paper",
      date: "2024-10-10",
      subject: "AI Ethics",
      questions: [
        { id: 1, question: "What are the key ethical issues surrounding AI development?", completed: false },
        { id: 2, question: "Discuss the potential for AI bias in decision-making systems.", completed: false },
        { id: 3, question: "What are some frameworks for ethical AI development?", completed: false },
      ],
    },
    {
      id: 10,
      title: "AI for Robotics Midterm",
      date: "2024-10-12",
      subject: "AI for Robotics",
      questions: [
        { id: 1, question: "What is the role of AI in modern robotics?", completed: false },
        { id: 2, question: "Explain the use of path planning algorithms in robotics.", completed: false },
        { id: 3, question: "How do robots use sensors and AI for navigation?", completed: false },
      ],
    },
    {
      id: 11,
      title: "AI System Design Final Project",
      date: "2024-10-20",
      subject: "AI System Design",
      questions: [
        { id: 1, question: "What are the key components of an AI system architecture?", completed: false },
        { id: 2, question: "Explain the role of data pipelines in AI system design.", completed: false },
        { id: 3, question: "How do you ensure scalability in AI system design?", completed: false },
      ],
    },
    {
      id: 12,
      title: "AI in Healthcare Final Report",
      date: "2024-10-25",
      subject: "AI in Healthcare",
      questions: [
        { id: 1, question: "What are some applications of AI in healthcare?", completed: false },
        { id: 2, question: "How does AI improve diagnostic accuracy in healthcare?", completed: false },
        { id: 3, question: "What are the challenges of implementing AI in healthcare systems?", completed: false },
      ],
    },
  ];
  
  export default function PomodoroPage() {
    const [time, setTime] = useState(25 * 60); // 25 minutes
    const [timerOn, setTimerOn] = useState(false);
    const [tasks, setTasks] = useState<any[]>([]); // Task list now stores assignment objects
    const [completedTasks, setCompletedTasks] = useState<any[]>([]); // Completed tasks
    const [availableAssignments, setAvailableAssignments] = useState(assignmentsData); // Available assignment tasks
    const [showMoreAssignments, setShowMoreAssignments] = useState(false); // Toggle for showing more assignments
    const [showUpcomingTasks, setShowUpcomingTasks] = useState(true); // Toggle between Upcoming and Completed Tasks
  
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
  
    useEffect(() => {
      if (timerOn && tasks.length === 0) {
        setTimerOn(false);
        setTime(25 * 60);
        alert("All tasks are completed! Time to select new tasks.");
      }
    }, [timerOn, tasks]);
  
    const handleStart = () => setTimerOn(true);
    const handleStop = () => setTimerOn(false);
    const resetTimer = () => {
      setTimerOn(false);
      setTime(25 * 60);
    };
  
    const addTask = (assignment: any) => {
      setTasks((prevTasks) => [...prevTasks, assignment]);
      setAvailableAssignments((prev) => prev.filter((asg) => asg.id !== assignment.id));
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
      <div className="pomodoro-container p-6 text-black text-center bg-cyan-900">
        {/* Timer and tasks section */}
        <div className={`timer-tasks-container p-8 rounded-lg shadow-lg ${timerOn ? "bg-blue-100" : "bg-white"}`}>
          <h1 className="text-4xl font-bold mb-8">Pomofocus</h1>
  
          {/* Timer */}
          <div className={`timer text-8xl mb-8 ${timerOn ? "bg-blue-100 p-4 rounded-lg" : ""}`}>
            {formatTime(time)}
          </div>
  
          {/* Start, Stop, Reset buttons */}
          {!timerOn ? (
            <button
              onClick={handleStart}
              className="px-6 py-3 text-2xl bg-black text-white rounded-lg mr-4"
            >
              Start
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="px-6 py-3 text-2xl bg-black text-white rounded-lg mr-4"
            >
              Stop
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-6 py-3 text-2xl bg-black text-white rounded-lg"
          >
            Reset
          </button>
  
          {/* Always show the task list */}
          <div className="tasks mt-12 mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id} className={`relative p-4 rounded-lg shadow-lg ${timerOn ? "bg-yellow-200" : "bg-gray-100"}`}>
                  <div>
                    <h3 className="font-bold mb-2">{task.subject} - {task.title} <span className="ml-2 text-sm text-gray-500">({task.date})</span></h3>
                    <ul className="space-y-1">
                      {task.questions.map((question) => (
                        <li key={question.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={question.completed}
                            onChange={() => toggleQuestionCompletion(task.id, question.id)}
                            className="mr-2"
                          />
                          <span className={question.completed ? "line-through text-green-500" : "text-red-500"}>
                            {question.question}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => markTaskAsSubmitted(task.id)}
                    disabled={!isAssignmentComplete(task)}
                    className={`mt-4 px-4 py-2 rounded-lg text-white ${
                      isAssignmentComplete(task) ? "bg-green-500 hover:bg-green-700" : "bg-gray-400"
                    }`}
                  >
                    Have you submitted?
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
       
        {!timerOn && (
          <div className="task-toggle-container mt-12 p-8 rounded-lg shadow-lg bg-white">
           
            <div className="task-toggle-buttons mt-6">
              <button
                onClick={() => setShowUpcomingTasks(true)}
                className={`px-4 py-2 rounded-lg mr-2 ${showUpcomingTasks ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
              >
                Upcoming Tasks
              </button>
              <button
                onClick={() => setShowUpcomingTasks(false)}
                className={`px-4 py-2 rounded-lg ${!showUpcomingTasks ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
              >
                Completed Tasks
              </button>
            </div>
  
            {/* Conditional Task Display */}
            {showUpcomingTasks ? (
              <div className="assignments mt-12 mx-auto max-w-3xl">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Assignments</h2>
                {["Due Today", "Due This Week", "Due Later", "Past Due"].map((category) => (
                  <div key={category} className="mb-6">
                    {categorizedAssignments[category].length > 0 && (
                      <>
                        <h3 className="text-lg font-bold mb-2">{category}</h3>
                        <ul className="space-y-4">
                          {categorizedAssignments[category]
                            .slice(0, showMoreAssignments ? categorizedAssignments[category].length : 3)
                            .map((assignment) => (
                              <li
                                key={assignment.id}
                                className="bg-gray-100 text-black p-4 rounded-lg shadow-lg flex justify-between items-center"
                              >
                                <div>
                                  <h4 className="font-bold">
                                    {assignment.subject} - {assignment.title}
                                    <span className="ml-2 text-sm text-gray-500">({assignment.date})</span>
                                  </h4>
                                </div>
                                <button
                                  onClick={() => addTask(assignment)}
                                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                  Add to Task
                                </button>
                              </li>
                            ))}
                        </ul>
                        {categorizedAssignments[category].length > 3 && (
                          <button
                            onClick={() => setShowMoreAssignments(!showMoreAssignments)}
                            className="mt-4 text-blue-600 hover:underline"
                          >
                            {showMoreAssignments ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="completed-tasks mt-12 mx-auto max-w-3xl">
                <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
                <ul className="space-y-4">
                  {completedTasks.map((task) => (
                    <li
                      key={task.id}
                      className="bg-green-500 text-white p-4 rounded-lg shadow-lg"
                    >
                      {task.subject} - {task.title} (Submitted)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }