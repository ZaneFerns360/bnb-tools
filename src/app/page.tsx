import React from "react";
import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import { Timer } from "lucide-react";
import { getServerAuthSession } from "~/server/auth";
import { LogOutIcon, UserIcon } from "lucide-react"; // Example icons, replace as needed

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
        <div className="flex flex-col items-center gap-6">
          <div className="group">
            <p className="text-center text-3xl font-bold tracking-tight">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {session.user?.name}
              </span>
              !
            </p>
            <div className="mx-auto mt-1 h-1 w-0 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {isJudge && (
              <Link
                href="/judge"
                className="flex transform items-center rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/25"
              >
                <span className="relative">
                  Judge Portal
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            )}
            {(!isJudge || isVIP) && (
              <Link
                href="/admin/"
                className="flex transform items-center rounded-lg bg-gradient-to-r from-blue-600 to-emerald-700 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/25"
              >
                Managing Portal
              </Link>
            )}

            {(!isJudge || isVIP) && (
              <Link
                href="/admin/checkin"
                className="flex transform items-center rounded-lg bg-gradient-to-r from-blue-600 to-emerald-700 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/25"
              >
                Check In
              </Link>
            )}
            {isVIP && (
              <Link
                href="/admin/dashboard"
                className="flex transform items-center rounded-lg bg-gradient-to-r from-blue-600 to-emerald-700 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/25"
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/api/auth/signout"
              className="flex transform items-center rounded-lg bg-gradient-to-r from-red-500 to-red-700 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/25"
            >
              <LogOutIcon className="mr-2 h-5 w-5" />
              Sign out
            </Link>
          </div>
        </div>
      );
    }
    return (
      <Link
        href="/api/auth/signin"
        className="group flex transform items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/25"
      >
        <UserIcon className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
        Sign in
      </Link>
    );
  };

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="relative w-full px-4 py-24">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

          {/* Content */}
          <div className="relative mx-auto max-w-4xl rounded-2xl px-8 py-16 shadow-2xl backdrop-blur-sm">
            <div className="text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
                BitNBuild 2024
              </h1>
              <p className="mb-8 text-xl font-medium text-gray-300 sm:text-2xl">
                24-hour Hackathon by{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  GDSC CRCE
                </span>
              </p>
              <div className="flex justify-center gap-4">
                {renderNavigationButtons()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
