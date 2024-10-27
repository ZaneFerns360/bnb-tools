"use client";
import React, { useMemo, useEffect, useState } from "react";
import { getAllTeamDetailsPlus } from "~/app/api/averageAllDetails"; // Adjust path as needed
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import * as Switch from "@radix-ui/react-switch";

type TeamDetails = {
  id: string;
  name: string;
  member1: string | null;
  scores: Record<string, Record<string, number>>;
  round1Avg: number | null;
  round2Avg: number | null;
  totalAvg: number | null;
};

const Leaderboard = ({ value }: { value: string }) => {
  const [data, setData] = useState<TeamDetails[]>([]);
  const [sortByTotalAvg, setSortByTotalAvg] = useState(false);

  const scoreCategories = [
    { key: "design", icon: "🎨", label: "Design", maxScore: 10 },
    { key: "functionality", icon: "⚙", label: "Functionality", maxScore: 10 },
    { key: "innovation", icon: "💡", label: "Innovation", maxScore: 10 },
    { key: "feasibility", icon: "📈", label: "Feasibility", maxScore: 10 },
    { key: "user_experience", icon: "📱", label: "UX", maxScore: 10 },
    { key: "scalability", icon: "🔧", label: "Scalability", maxScore: 10 },
    { key: "demonstration", icon: "✔", label: "Demo", maxScore: 10 },
  ];

  useEffect(() => {
    async function fetchData() {
      const teamsData = await getAllTeamDetailsPlus();
      setData(teamsData);
    }
    fetchData();
  }, []);

  const calculateTotal = (scores: Record<string, Record<string, number>>) => {
    if (!scores?.[value]) return 0;
    return scoreCategories.reduce((total, category) => {
      const score = scores[value]?.[category.key] || 0;
      return total + score;
    }, 0);
  };

  const sortedTeams = useMemo(() => {
    return [...data]
      .map((team) => ({
        ...team,
        totalScore: calculateTotal(team.scores),
      }))
      .sort((a, b) =>
        sortByTotalAvg
          ? (b.totalAvg ?? 0) - (a.totalAvg ?? 0)
          : b.totalScore - a.totalScore,
      );
  }, [data, value, sortByTotalAvg]);

  const maxPossibleScore = scoreCategories.reduce(
    (total, category) => total + category.maxScore,
    0,
  );

  return (
    <Card className="mx-auto max-w-[95vw] border-none bg-gray-900 backdrop-blur-sm">
      <CardHeader className="flex flex-col items-center pb-2">
        <CardTitle className="text-center text-2xl font-bold text-gray-100 md:text-3xl lg:text-4xl">
          Leaderboard
        </CardTitle>
        <div className="mt-2 flex items-center space-x-2">
          <label htmlFor="toggle-sort" className="text-gray-200">
            Sort by Total Average
          </label>
          <Switch.Root
            id="toggle-sort"
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors duration-200 ease-in-out focus:outline-none"
            checked={sortByTotalAvg}
            onCheckedChange={setSortByTotalAvg}
          >
            <Switch.Thumb className="inline-block h-5 w-5 translate-x-0.5 transform rounded-full bg-white transition duration-200 ease-in-out data-[state=checked]:translate-x-[20px]" />
          </Switch.Root>
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <ScrollArea className="rounded-lg border border-gray-700">
          <div className="min-w-[700px]">
            <Table>
              <TableHeader className="bg-gray-800/80">
                <TableRow>
                  <TableHead className="sticky left-0 z-20 w-12 bg-gray-800/80 text-gray-200">
                    Rank
                  </TableHead>
                  <TableHead className="sticky left-12 z-20 min-w-[180px] bg-gray-800/80 text-gray-200">
                    Team
                  </TableHead>
                  <TableHead className="min-w-[150px] text-gray-200">
                    Leader
                  </TableHead>
                  {scoreCategories.map(({ icon, label, maxScore }) => (
                    <TableHead
                      key={label}
                      className="text-center text-gray-200"
                    >
                      <div className="hidden flex-col md:flex">
                        <span>
                          {icon} {label}
                        </span>
                        <span className="text-xs text-gray-400">
                          /{maxScore}
                        </span>
                      </div>
                      <span className="md:hidden">{icon}</span>
                    </TableHead>
                  ))}
                  <TableHead className="text-center font-bold text-gray-200">
                    <div className="flex flex-col">
                      <span>Total</span>
                      <span className="text-xs text-gray-400">
                        /{maxPossibleScore}
                      </span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-200">
                    <div className="flex flex-col">
                      <span>Round 1 Avg</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-200">
                    <div className="flex flex-col">
                      <span>Round 2 Avg</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-200">
                    <div className="flex flex-col">
                      <span>Total Avg</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTeams.map((team, index) => (
                  <TableRow
                    key={team.id}
                    className={`group border-b border-gray-700 transition-colors hover:bg-gray-800/50 ${
                      index === 0
                        ? "bg-yellow-500/10"
                        : index === 1
                          ? "bg-gray-400/10"
                          : index === 2
                            ? "bg-orange-700/10"
                            : ""
                    }`}
                  >
                    <TableCell className="sticky left-0 z-20 bg-gray-900/90 text-center font-medium text-gray-300 group-hover:bg-gray-800/90">
                      <div className="flex items-center justify-center">
                        {index === 0
                          ? "🥇"
                          : index === 1
                            ? "🥈"
                            : index === 2
                              ? "🥉"
                              : index + 1}
                      </div>
                    </TableCell>
                    <TableCell className="sticky left-12 z-20 bg-gray-900/90 font-medium text-gray-200 group-hover:bg-gray-800/90">
                      {team.name}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {team.member1}
                    </TableCell>
                    {scoreCategories.map(({ key }) => (
                      <TableCell
                        key={key}
                        className="text-center text-gray-300"
                      >
                        {team.scores[value]?.[key] || 0}
                      </TableCell>
                    ))}
                    <TableCell className="text-center text-gray-300">
                      {team.totalScore}
                    </TableCell>
                    <TableCell className="text-center text-gray-300">
                      {team.round1Avg !== null
                        ? team.round1Avg.toFixed(2)
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center text-gray-300">
                      {team.round2Avg !== null
                        ? team.round2Avg.toFixed(2)
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center text-gray-300">
                      {team.totalAvg !== null
                        ? team.totalAvg.toFixed(2)
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
