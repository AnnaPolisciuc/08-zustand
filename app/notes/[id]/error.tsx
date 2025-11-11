"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorProps) {
  return (
    <div>
     <p>Something went wrong. {error.message}</p>
     <button 
     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
     onClick={reset}>Try again</button>
     </div>
    );
}