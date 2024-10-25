"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { LogOut, Search, ArrowRight, Loader2 } from "lucide-react";
import QRScanner from "../_components/qrScanner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { getTeamDetailsByName } from "../api/searchTeam";

interface Team {
  id: string;
  name: string;
  number?: number;
  member1: string | null;
  member2: string | null;
  member3: string | null;
  member4: string | null;
  domain: string | null;
  day1: any | null;
  day2: any | null;
}

const Page = () => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setTeams([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getTeamDetailsByName(searchQuery);
      setTeams(data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setError("Failed to fetch teams. Please try again.");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSearch();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeam?.id) {
      router.push(`/admin/${selectedTeam.id}`);
    }
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setSearchQuery(team.name);
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md border-gray-700 bg-gray-800 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-white">
            Admin Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Select Team
              </label>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        ref={inputRef}
                        placeholder="Search teams..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setSelectedTeam(null);
                        }}
                        onKeyDown={handleKeyDown}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-left text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          !selectedTeam && "text-gray-400",
                        )}
                      />
                      {loading && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleSearch}
                      disabled={loading}
                      className="flex items-center justify-center rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-[var(--radix-popover-trigger-width)] border-gray-700 bg-gray-900/95 p-2 shadow-lg backdrop-blur-sm"
                >
                  <div className="max-h-[300px] overflow-y-auto rounded-lg">
                    {teams?.length > 0 ? (
                      <div className="space-y-2">
                        {teams.map((team) => (
                          <button
                            key={team.id}
                            onClick={() => handleTeamSelect(team)}
                            className="group relative w-full transform rounded-lg border border-gray-700 bg-gray-800 p-4 text-left transition-all duration-200 hover:border-purple-500/50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="text-lg font-semibold text-white transition-colors group-hover:text-purple-400">
                                      {team.name}
                                    </div>
                                    {team.domain && (
                                      <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                                        {team.domain}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                  <div className="flex -space-x-2">
                                    {[
                                      team.member1,
                                      team.member2,
                                      team.member3,
                                      team.member4,
                                    ]
                                      .filter(Boolean)
                                      .slice(0, 2)
                                      .map((member, idx) => (
                                        <div
                                          key={idx}
                                          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-800 bg-gray-700"
                                        >
                                          <span className="text-xs text-gray-300">
                                            {member?.charAt(0)}
                                          </span>
                                        </div>
                                      ))}
                                    {(team.number || 0) > 2 && (
                                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-800 bg-gray-700">
                                        <span className="text-xs text-gray-300">
                                          +{(team.number || 0) - 2}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-gray-400">
                                    {team.number}{" "}
                                    {team.number === 1 ? "member" : "members"}
                                  </span>
                                </div>
                              </div>

                              <div className="text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-purple-400">
                                <ArrowRight className="h-5 w-5" />
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        {error ? (
                          <div className="text-red-400">
                            <span className="mb-2 block text-3xl">⚠️</span>
                            <p>{error}</p>
                          </div>
                        ) : searchQuery ? (
                          <div className="text-gray-400">
                            <span className="mb-2 block text-3xl">🔍</span>
                            <p>No teams found</p>
                          </div>
                        ) : (
                          <div className="text-gray-400">
                            <span className="mb-2 block text-3xl">⌨️</span>
                            <p>Type to search teams</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={!selectedTeam}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Go to Admin
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-800 px-2 text-gray-400">
                    or scan QR code
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <QRScanner />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Link
        href="/api/auth/signout"
        className="mt-6 flex items-center gap-2 rounded-full bg-gray-800 px-6 py-2 font-medium text-white transition-colors hover:bg-gray-700"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Link>
    </div>
  );
};

export default Page;
