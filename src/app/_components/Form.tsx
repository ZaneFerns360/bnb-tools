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
import {
  Users,
  Palette,
  Settings,
  Lightbulb,
  Rocket,
  Smartphone,
  Expand,
  CheckSquare,
  Search,
  Loader2,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { getTeamDetailsByName } from "../api/searchTeam";
// API function to get team details

// API function to submit evaluation
export async function submitEvaluation(teamId: string, ratings: Rating) {
  try {
    const response = await fetch("/api/evaluations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamId,
        ...ratings,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to submit evaluation");
    }
    return await response.json();
  } catch (error) {
    console.error("Error submitting evaluation:", error);
    throw error;
  }
}

interface Rating {
  design: string;
  functionality: string;
  innovation: string;
  feasibility: string;
  userExperience: string;
  scalability: string;
  demonstration: string;
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

const TeamEvaluationForm: React.FC = () => {
  // Search and team selection state
  const [searchQuery, setSearchQuery] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ratings state
  const [ratings, setRatings] = useState<Rating>({
    design: "",
    functionality: "",
    innovation: "",
    feasibility: "",
    userExperience: "",
    scalability: "",
    demonstration: "",
  });

  const handleRatingChange = (category: keyof Rating, value: string) => {
    setRatings((prevRatings) => ({ ...prevRatings, [category]: value }));
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

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setSearchQuery(team.name);
    setOpen(false);
    inputRef.current?.focus();
  };

  const isFormValid = () => {
    return (
      selectedTeam && Object.values(ratings).every((rating) => rating !== "")
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTeam || !isFormValid()) return;

    try {
      setSubmitLoading(true);
      setSubmitError(null);
      await submitEvaluation(selectedTeam.id, ratings);
      setSubmitSuccess(true);
      // Reset form
      setSelectedTeam(null);
      setSearchQuery("");
      setRatings({
        design: "",
        functionality: "",
        innovation: "",
        feasibility: "",
        userExperience: "",
        scalability: "",
        demonstration: "",
      });
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      setSubmitError("Failed to submit evaluation. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const ratingCategories = [
    { key: "design", label: "Design", icon: Palette },
    { key: "functionality", label: "Functionality", icon: Settings },
    { key: "innovation", label: "Innovation", icon: Lightbulb },
    { key: "feasibility", label: "Feasibility", icon: Rocket },
    { key: "userExperience", label: "User Experience", icon: Smartphone },
    { key: "scalability", label: "Scalability", icon: Expand },
    { key: "demonstration", label: "Demonstration", icon: CheckSquare },
  ] as const;

  return (
    <Card className="mx-auto w-full max-w-3xl border-gray-700 bg-gray-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-white">
          Team Evaluation Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                className="w-[var(--radix-popover-trigger-width)] p-0"
              >
                <div className="max-h-[300px] overflow-y-auto">
                  {teams?.length > 0 ? (
                    teams.map((team) => (
                      <button
                        key={team.id}
                        onClick={() => handleTeamSelect(team)}
                        className="w-full border-b border-gray-700 bg-gray-700 p-3 text-left hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">
                              {team.name}
                            </div>
                            <div className="text-white">{team.member1}</div>
                            <div className="text-sm text-gray-400">
                              {team.totalMembers} members
                            </div>
                          </div>
                          {team.domain && (
                            <span className="text-sm text-gray-400">
                              {team.domain}
                            </span>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-sm text-gray-400">
                      {error ||
                        (searchQuery
                          ? "No teams found"
                          : "Type to search teams")}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Team Details Section */}
          {selectedTeam && (
            <div className="rounded-lg border border-gray-700 bg-gray-700/50 p-4">
              <h3 className="mb-2 text-lg font-medium text-white">
                {selectedTeam.name}
              </h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p>Domain: {selectedTeam.domain}</p>
                <p>Members:</p>
                <ul className="ml-4 list-disc">
                  {selectedTeam.member1 && <li>{selectedTeam.member1}</li>}
                  {selectedTeam.member2 && <li>{selectedTeam.member2}</li>}
                  {selectedTeam.member3 && <li>{selectedTeam.member3}</li>}
                  {selectedTeam.member4 && <li>{selectedTeam.member4}</li>}
                </ul>
              </div>
            </div>
          )}

          {/* Rating Sections */}
          <div className="space-y-4">
            {ratingCategories.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex flex-col space-y-1">
                <Label htmlFor={key} className="text-gray-300">
                  {label}
                </Label>
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-gray-400" />
                  <Select
                    onValueChange={(value) =>
                      handleRatingChange(key as keyof Rating, value)
                    }
                    value={ratings[key as keyof Rating]}
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
          </div>

          {/* Success/Error Messages */}
          {submitSuccess && (
            <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-400">
              Evaluation submitted successfully!
            </div>
          )}
          {submitError && (
            <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">
              {submitError}
            </div>
          )}

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button
              type="submit"
              className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={!isFormValid() || submitLoading}
            >
              {submitLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit Evaluation"
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TeamEvaluationForm;
