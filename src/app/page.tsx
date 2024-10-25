import React from "react";
import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import { Timer } from "lucide-react";
import { getServerAuthSession } from "~/server/auth";

const EventTimeline = () => (
  <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 p-4 md:grid-cols-4">
    {[
      { title: "Registration", date: "Jan 15", status: "Completed" },
      { title: "Team Formation", date: "Jan 20", status: "Ongoing" },
      { title: "Hackathon Start", date: "Jan 25", status: "Upcoming" },
      { title: "Demo Day", date: "Jan 27", status: "Upcoming" },
    ].map((phase, index) => (
      <div key={index} className="rounded-lg bg-white/10 p-4 text-center">
        <h3 className="mb-2 font-bold">{phase.title}</h3>
        <p className="text-sm text-gray-300">{phase.date}</p>
        <span
          className={`text-xs ${
            phase.status === "Completed"
              ? "text-green-400"
              : phase.status === "Ongoing"
                ? "text-yellow-400"
                : "text-gray-400"
          }`}
        >
          {phase.status}
        </span>
      </div>
    ))}
  </div>
);

export default async function Home() {
  const session = await getServerAuthSession();

  const renderNavigationButtons = () => {
    if (session) {
      const userName = session.user?.name?.toLowerCase() || "";
      const isJudge = userName.startsWith("judge");
      const isVIP = userName.startsWith("vip");

      return (
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-xl">Welcome, {session.user?.name}!</p>
          <div className="flex gap-4">
            {isJudge && (
              <Link
                href="/judge"
                className="rounded-full bg-purple-600 px-8 py-3 font-semibold no-underline transition hover:bg-purple-700"
              >
                Judge Portal
              </Link>
            )}
            {(!isJudge || isVIP) && (
              <Link
                href="/admin/"
                className="rounded-full bg-green-600 px-8 py-3 font-semibold no-underline transition hover:bg-green-700"
              >
                Food Portal
              </Link>
            )}

            {isVIP && (
              <Link
                href="/admin/dashboard"
                className="rounded-full bg-green-600 px-8 py-3 font-semibold no-underline transition hover:bg-green-700"
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/api/auth/signout"
              className="rounded-full bg-white/10 px-8 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Sign out
            </Link>
          </div>
        </div>
      );
    }

    return (
      <Link
        href="/api/auth/signin"
        className="rounded-full bg-white/10 px-8 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        Sign in
      </Link>
    );
  };

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gray-800 text-white">
        {/* Hero Section */}
        <div className="w-full bg-black/30 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="mb-6 text-5xl font-bold">BitNBuild 2024</h1>
            <p className="mb-8 text-xl">24-hour Hackathon by GDSC CRCE</p>
            <div className="flex justify-center gap-4">
              {renderNavigationButtons()}
            </div>
          </div>
        </div>

        <section className="w-full bg-black/20 py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Prizes</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { place: "1st", prize: "₹50,000", color: "from-yellow-400" },
                { place: "2nd", prize: "₹30,000", color: "from-gray-400" },
                { place: "3rd", prize: "₹20,000", color: "from-orange-400" },
              ].map((prize, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-b ${prize.color} rounded-lg to-transparent p-6 text-center`}
                >
                  <h3 className="mb-2 text-2xl font-bold">
                    {prize.place} Place
                  </h3>
                  <p className="text-3xl font-bold">{prize.prize}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
