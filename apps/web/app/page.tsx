import Link from "next/link";

export default function Page() {
  
  return (
    <div className="flex flex-col h-screen justify-center items-center w-screen bg-black/90 text-white/90">
      <p>Landing Page - (under construction)</p>
      <button className="mt-4 px-4 py-2 bg-white/80 text-black rounded hover:bg-white-90">
        <Link href="/dashboard">Go to Dashboard</Link>
      </button>
    </div>
  );
}