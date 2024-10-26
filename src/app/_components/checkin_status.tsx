"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Search, Users, CheckCircle2, XCircle, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { updateTeam } from "../api/updateTeam";

const TeamsOverview = ({ teams }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      [team.member1, team.member2, team.member3, team.member4]
        .filter(Boolean)
        .some((member) =>
          member.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
      team.domain?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getTeamMembers = (team) => {
    return [team.member1, team.member2, team.member3, team.member4].filter(
      Boolean,
    );
  };

  const handleCheckIn = async (team) => {
    try {
      await updateTeam({
        id: team.id,
        checkin: !team.checkin,
      });
    } catch (error) {
      console.error("Error updating team status:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <Card className="border-gray-700 bg-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Teams Overview</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by team name, member, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-gray-700 bg-gray-800 pl-10 text-white placeholder-gray-400"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[70vh]">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTeams.map((team) => (
                <Card key={team.id} className="border-gray-700 bg-gray-900">
                  <CardContent className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-400" />
                        <h3 className="font-semibold text-white">
                          {team.name}
                        </h3>
                      </div>
                      <span className="rounded-full bg-gray-800 px-2 py-1 text-sm text-white">
                        {team.number}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="space-y-2">
                        <span className="text-gray-400">Team Members:</span>
                        <div className="grid grid-cols-2 gap-2">
                          {getTeamMembers(team).map((member, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 rounded-lg bg-gray-800 p-2"
                            >
                              <User className="h-4 w-4 text-blue-400" />
                              <span className="truncate">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {team.domain && (
                        <p className="mt-3">
                          <span className="text-gray-400">Domain:</span>{" "}
                          <span className="rounded-md bg-gray-800 px-2 py-1">
                            {team.domain}
                          </span>
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Status:</span>
                          {team.checkin ? (
                            <div className="flex items-center gap-1 text-green-500">
                              <CheckCircle2 className="h-4 w-4" />
                              <span className="text-xs">Checked In</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-500">
                              <XCircle className="h-4 w-4" />
                              <span className="text-xs">Not Checked In</span>
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => handleCheckIn(team)}
                          variant={team.checkin ? "destructive" : "default"}
                          size="sm"
                          className={
                            team.checkin
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }
                        >
                          {team.checkin ? "Undo Check-in" : "Check-in"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamsOverview;
