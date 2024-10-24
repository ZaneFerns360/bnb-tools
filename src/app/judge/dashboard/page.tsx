"use client";
import React, { useState } from "react";
import Leaderboard from "~/app/_components/Leaderboard"; // Adjust path if needed

const round1Data = [
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  // Additional data for Round 1
];

const round2Data = [
  {
    teamName: "Team Beta",
    teamLeader: "Bob",
    design: "8",
    functionality: "7",
    innovation: "9",
    feasibility: "6",
    userExperience: "8",
    scalability: "9",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Alpha",
    teamLeader: "Alice",
    design: "9",
    functionality: "8",
    innovation: "7",
    feasibility: "6",
    userExperience: "9",
    scalability: "8",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Beta",
    teamLeader: "Bob",
    design: "8",
    functionality: "7",
    innovation: "9",
    feasibility: "6",
    userExperience: "8",
    scalability: "9",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Beta",
    teamLeader: "Bob",
    design: "8",
    functionality: "7",
    innovation: "9",
    feasibility: "6",
    userExperience: "8",
    scalability: "9",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Beta",
    teamLeader: "Bob",
    design: "8",
    functionality: "7",
    innovation: "9",
    feasibility: "6",
    userExperience: "8",
    scalability: "9",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Beta",
    teamLeader: "Bob",
    design: "8",
    functionality: "7",
    innovation: "9",
    feasibility: "6",
    userExperience: "8",
    scalability: "9",
    demonstration: "7",
    total: "54",
  },
  {
    teamName: "Team Beta",
    teamLeader: "Bob",
    design: "8",
    functionality: "7",
    innovation: "9",
    feasibility: "6",
    userExperience: "8",
    scalability: "9",
    demonstration: "7",
    total: "54",
  },
  // Additional data for Round 2
];

export default function Home() {
  const [selectedRound, setSelectedRound] = useState<"round1" | "round2">(
    "round1",
  );
  const roundData = selectedRound === "round1" ? round1Data : round2Data;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black">
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => setSelectedRound("round1")}
          className={`${
            selectedRound === "round1"
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-l-lg px-4 py-2`}
        >
          Round 1
        </button>
        <button
          onClick={() => setSelectedRound("round2")}
          className={`${
            selectedRound === "round2"
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-r-lg px-4 py-2`}
        >
          Round 2
        </button>
      </div>
      <Leaderboard data={roundData} />
    </div>
  );
}
