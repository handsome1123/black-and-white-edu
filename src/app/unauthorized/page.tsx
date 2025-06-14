"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Unauthorized Access</h1>
      <button onClick={() => router.push("/")} className="px-4 py-2 bg-blue-500 text-white rounded">
        Go Home
      </button>
    </div>
  );
}
