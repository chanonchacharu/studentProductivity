import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-8">Welcome to ADHD Restrainer</h1>

      <div className="flex flex-col space-y-6">
        {/* Button to navigate to Calendar */}
        <Link href="/calendar">
          <button className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
            Go to Calendar
          </button>
        </Link>

        {/* Button to navigate to Pomodoro */}
        <Link href="/pomodoropage">
          <button className="bg-red-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-red-700 transition-all">
            Go to Pomodoro
          </button>
        </Link>
      </div>
    </div>
  );
}
