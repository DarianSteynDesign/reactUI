import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/protected", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setMessage(data.message || "No message received");
      } catch (error) {
        console.error("Failed to fetch protected resource:", error);
        setMessage("Failed to fetch data");
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to My App
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Protected API Response:{" "}
        <span className="font-mono text-green-600">{message}</span>
      </p>

      <p className="text-gray-600 mb-4">Please either -</p>
      <div className="flex space-x-4">
        <Link
          href="/signup"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
