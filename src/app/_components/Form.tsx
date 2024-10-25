"use client";
import React, { useState, useCallback, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Palette,
  Settings,
  Lightbulb,
  Rocket,
  Smartphone,
  Expand,
  CheckSquare,
  Search,
  Loader2,
  Edit2,
  ArrowRight,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { getTeamDetailsByName } from "../api/searchTeam";
import { addJudgement } from "../api/addJudgement";
import { updateJudgement } from "../api/updateJudgement";
import { useRouter } from "next/navigation";
import { getTeamScores } from "../api/getTeamScores";

interface Rating {
  id?: string;
  teamId: string;
  design: string;
  functionality: string;
  innovation: string;
  feasibility: string;
  user_experience: string;
  scalability: string;
  demonstration: string;
  judge?: string;
  round?: number;
}

interface Team {
  id: string;
  name: string;
  totalMembers?: number;
  member1: string | null;
  member2: string | null;
  member3: string | null;
  member4: string | null;
  domain: string | null;
  day1: any | null;
  day2: any | null;
}

const TeamEvaluationForm: React.FC<{ username: string }> = ({ username }) => {
  const [activeTab, setActiveTab] = useState("round1");
  const [searchQuery, setSearchQuery] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamScore, setTeamScore] = useState<Rating[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingScoreId, setEditingScoreId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [ratings, setRatings] = useState<Rating>({
    teamId: "",
    design: "",
    functionality: "",
    innovation: "",
    feasibility: "",
    user_experience: "",
    scalability: "",
    demonstration: "",
  });

  const handleRatingChange = (category: keyof Rating, value: string) => {
    setRatings((prevRatings) => ({ ...prevRatings, [category]: value }));
  };

  const handleEditClick = (score: Rating) => {
    setIsEditing(true);
    setEditingScoreId(score.id!);
    setRatings({
      teamId: score.teamId,
      design: score.design,
      functionality: score.functionality,
      innovation: score.innovation,
      feasibility: score.feasibility,
      user_experience: score.user_experience,
      scalability: score.scalability,
      demonstration: score.demonstration,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingScoreId(null);
    setRatings({
      teamId: "",
      design: "",
      functionality: "",
      innovation: "",
      feasibility: "",
      user_experience: "",
      scalability: "",
      demonstration: "",
    });
  };

  const handleSubmit = async () => {
    if (!selectedTeam) return;

    try {
      setSubmitLoading(true);
      setSubmitError(null);

      if (isEditing && editingScoreId) {
        // Update existing score
        await updateJudgement(editingScoreId, {
          ...ratings,
          judge: username,
          round: activeTab === "round1" ? 1 : 2,
        });
      } else {
        // Add new score
        await addJudgement({
          ...ratings,
          teamId: selectedTeam.id,
          judge: username,
          round: teamScore.length === 0 ? 1 : 2,
        });
      }

      setSubmitSuccess(true);
      // Refresh team scores after submission
      const updatedScores = await getTeamScores(selectedTeam.id);
      setTeamScore(updatedScores);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 2000);

      // Reset form
      setRatings({
        teamId: "",
        design: "",
        functionality: "",
        innovation: "",
        feasibility: "",
        user_experience: "",
        scalability: "",
        demonstration: "",
      });
      setIsEditing(false);
      setEditingScoreId(null);
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      setSubmitError("Failed to submit evaluation. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

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
      console.log(searchQuery, data);
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

  const handleTeamSelect = async (team: Team) => {
    console.log(team);
    setSelectedTeam(team);
    setSearchQuery(team.name);
    setRatings((prev) => ({
      ...prev,
      teamId: team.id,
    }));
    setOpen(false);
    const scores = await getTeamScores(team.id);
    setTeamScore(scores);
    setActiveTab(scores.length === 0 ? "round1" : "round2");
    inputRef.current?.focus();
  };

  const isFormValid = () => {
    const requiredRatings = Object.entries(ratings).filter(
      ([key]) => key !== "teamId",
    );
    return selectedTeam && requiredRatings.every(([_, value]) => value !== "");
  };

  const ratingCategories = [
    { key: "design", label: "Design", icon: Palette },
    { key: "functionality", label: "Functionality", icon: Settings },
    { key: "innovation", label: "Innovation", icon: Lightbulb },
    { key: "feasibility", label: "Feasibility", icon: Rocket },
    { key: "user_experience", label: "User Experience", icon: Smartphone },
    { key: "scalability", label: "Scalability", icon: Expand },
    { key: "demonstration", label: "Demonstration", icon: CheckSquare },
  ] as const;

  const renderScoreCard = (roundData: Rating) => {
    const canEdit = roundData.judge === username;

    return (
      <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">
            Round {roundData.round} Scores
          </h3>
          {canEdit && !isEditing && (
            <Button
              onClick={() => handleEditClick(roundData)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-black"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ratingCategories.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">{label}:</span>
              <span className="font-medium text-white">
                {roundData[key as keyof Rating]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-400">
          Judged by: {roundData.judge}
        </div>
      </div>
    );
  };

  const renderEditForm = () => {
    return (
      <div className="space-y-4">
        {ratingCategories.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex flex-col space-y-1">
            <Label htmlFor={key} className="text-gray-300">
              {label}
            </Label>
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-gray-400" />
              <Select
                onValueChange={(value) => handleRatingChange(key, value)}
                value={ratings[key].toString()}
              >
                <SelectTrigger className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-gray-300">
                  <SelectValue
                    placeholder={`Rate ${label.toLowerCase()} (1-10)`}
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-300">
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={!isFormValid() || submitLoading}
            >
              {submitLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update Evaluation"
              )}
            </Button>
          </motion.div>
          <Button
            onClick={handleCancelEdit}
            variant="outline"
            className="rounded-lg border-gray-600 text-black hover:bg-gray-700"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-gray-700 bg-gray-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-white">
          Team Evaluation Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Section */}
        <div className="space-y-2">
          <Label className="text-gray-300">Select Team</Label>
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

        {/* Team Details Section */}
        {selectedTeam && (
          <div className="mt-4 rounded-lg border border-gray-700 bg-gray-700/50 p-4">
            <h3 className="mb-2 text-lg font-medium text-white">
              {selectedTeam.name}
            </h3>
            <div className="space-y-1 text-sm text-gray-300">
              <p>Team ID: {selectedTeam.id}</p>
              <p>Domain: {selectedTeam.domain}</p>
              <p>Members: {selectedTeam.number}</p>
              <ul className="ml-4 list-disc">
                {selectedTeam.member1 && <li>{selectedTeam.member1}</li>}
                {selectedTeam.member2 && <li>{selectedTeam.member2}</li>}
                {selectedTeam.member3 && <li>{selectedTeam.member3}</li>}
                {selectedTeam.member4 && <li>{selectedTeam.member4}</li>}
              </ul>
            </div>
          </div>
        )}

        {/* Tabs Section */}
        {selectedTeam && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="round1" className="text-white">
                Round 1
              </TabsTrigger>
              <TabsTrigger
                value="round2"
                className="text-white"
                disabled={teamScore.length === 0}
              >
                Round 2
              </TabsTrigger>
            </TabsList>

            {/* Round 1 Content */}
            <TabsContent value="round1">
              {teamScore.length > 0
                ? isEditing && editingScoreId === teamScore[0].id
                  ? renderEditForm()
                  : renderScoreCard(teamScore[0])
                : renderEditForm()}
            </TabsContent>

            {/* Round 2 Content */}
            <TabsContent value="round2">
              {teamScore.length > 1
                ? isEditing && editingScoreId === teamScore[1].id
                  ? renderEditForm()
                  : renderScoreCard(teamScore[1])
                : renderEditForm()}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamEvaluationForm;
