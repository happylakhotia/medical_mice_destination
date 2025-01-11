"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Explain() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing...");
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      let timeoutId: NodeJS.Timeout;

      timeoutId = setTimeout(() => setLoadingText("Parsing..."), 2000);
      timeoutId = setTimeout(() => setLoadingText("Asking LLM..."), 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [loading]);

  function handleExplainSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // simulates a request to the llm
    setTimeout(() => {
      setLoading(false);
      router.push("/medical/recommendations");
    }, 6000);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <form onSubmit={handleExplainSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">
            Explain Your Details
          </h2>

          <textarea
            name="explanation"
            placeholder="Explain your details"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full primary-button"
          >
            Submit
          </button>
        </form>

        {loading && (
          <div className="flex items-center justify-center mt-6">
            <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-6 h-6 animate-spin mr-3"></div>
            <span>{loadingText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
