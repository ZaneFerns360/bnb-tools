import React, { useMemo } from "react";
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

const Leaderboard = ({ data, value }) => {
  const scoreCategories = [
    { key: "design", icon: "🎨", label: "Design", maxScore: 10 },
    { key: "functionality", icon: "⚙", label: "Functionality", maxScore: 10 },
    { key: "innovation", icon: "💡", label: "Innovation", maxScore: 10 },
    { key: "feasibility", icon: "📈", label: "Feasibility", maxScore: 10 },
    { key: "user_experience", icon: "📱", label: "UX", maxScore: 10 },
    { key: "scalability", icon: "🔧", label: "Scalability", maxScore: 10 },
    { key: "demonstration", icon: "✔", label: "Demo", maxScore: 10 },
  ];

  // Calculate total score for a team
  const calculateTotal = (scores) => {
    if (!scores?.[value]) return 0;
    return scoreCategories.reduce((total, category) => {
      const score = scores[value]?.[category.key] || 0;
      return total + score;
    }, 0);
  };

  // Sort and calculate teams with their totals
  const sortedTeams = useMemo(() => {
    return [...data]
      .map((team) => ({
        ...team,
        totalScore: calculateTotal(team.scores),
      }))
      .sort((a, b) => b.totalScore - a.totalScore);
  }, [data, value]);

  // Calculate maximum possible score
  const maxPossibleScore = scoreCategories.reduce(
    (total, category) => total + category.maxScore,
    0,
  );

  return (
    <Card className="mx-auto max-w-[95vw] border-none bg-gray-900 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-2xl font-bold text-gray-100 md:text-3xl lg:text-4xl">
          Leaderboard
        </CardTitle>
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
                        {team?.scores[value]?.[key] || "-"}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-bold">
                      <span
                        className={` ${
                          team.totalScore === maxPossibleScore
                            ? "text-yellow-400"
                            : team.totalScore >= maxPossibleScore * 0.8
                              ? "text-emerald-400"
                              : team.totalScore >= maxPossibleScore * 0.6
                                ? "text-blue-400"
                                : "text-gray-300"
                        } `}
                      >
                        {team.totalScore}
                      </span>
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
