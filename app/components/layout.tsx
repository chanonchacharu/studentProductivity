import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/dashboard/calendar">Calendar</a>
            </li>
            <li>
              <a href="/dashboard/pomodoropage">Pomodoro</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 Productivity App</p>
      </footer>
    </div>
  );
};

export default Layout;
