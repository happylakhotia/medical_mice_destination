"use client";
import { useRouter } from "next/navigation";

export default function MedicalMain() {
  // preliminary page to welcome the user

  const router = useRouter();

  function handleExplain() {
    router.push("/medical/explain");
  }

  return (
    <>
      <h1>Lets Start Your Medical Journey</h1>
      <button
        className="p-3 m-3 bg-black text-white rounded-m hover:bg-slate-700"
        onClick={handleExplain}
      >
        Explain Your Details
      </button>
    </>
  );
}
