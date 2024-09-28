import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Homepage</h1>
      <p>Navigate to the dashboard homepage:</p>
      <Link href="/dashboard/">
        Go to Dashboard Homepage
      </Link>
    </main>
  );
}
