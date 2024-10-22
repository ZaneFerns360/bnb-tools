"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import QRScanner from "../_components/qrScanner";

const Page = () => {
  const [teamId, setTeamId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamId) {
      router.push(`/admin/${teamId}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">Select Team</h1>
        <div className="mb-4">
          <label
            htmlFor="teamId"
            className="mb-2 block font-medium text-gray-700"
          >
            Enter Team ID
          </label>
          <input
            type="text"
            id="teamId"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Team ID"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Go to Admin
        </button>
        <QRScanner />
      </form>

      <Link
        href={"/api/auth/signout"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        Sign Out
      </Link>
    </div>
  );
};

export default Page;
