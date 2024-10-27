"use server";
import { db } from "~/server/db";
import { Score } from "@prisma/client";

type TeamDetails = {
  id: string;
  name: string;
  member1: string | null;
  member2: string | null;
  member3: string | null;
  member4: string | null;
  domain: string | null;
  checkin: boolean;
  number: number;
  scores: Score[]; // Include scores in the TeamDetails type
};

type TeamDetailsWithAvgScore = TeamDetails & {
  averageScore: number; // Average score if both rounds exist
};

export async function getAllTeamDetails(): Promise<TeamDetailsWithAvgScore[]> {
  try {
    const teams = await db.team.findMany({
      include: {
        scores: true, // Include scores in the results
      },
    });

    // Process each team's scores
    return teams
      .map((team) => {
        const round1Score = team.scores.find((score) => score.round === 1);
        const round2Score = team.scores.find((score) => score.round === 2);

        // Only calculate the average if both round 1 and round 2 exist
        if (round1Score && round2Score) {
          const totalScoreRound1 =
            round1Score.design +
            round1Score.functionality +
            round1Score.innovation +
            round1Score.feasibility +
            round1Score.user_experience +
            round1Score.scalability +
            round1Score.demonstration;

          const totalScoreRound2 =
            round2Score.design +
            round2Score.functionality +
            round2Score.innovation +
            round2Score.feasibility +
            round2Score.user_experience +
            round2Score.scalability +
            round2Score.demonstration;

          // Calculate average score across both rounds
          const averageScore = (
            (totalScoreRound1 + totalScoreRound2) /
            2
          ).toFixed(2); // Rounding up to 2 decimal places

          // Return team details along with averageScore
          return {
            id: team.id,
            name: team.name,
            member1: team.member1,
            member2: team.member2,
            member3: team.member3,
            member4: team.member4,
            number: team.number,
            domain: team.domain,
            checkin: team.checkin,
            scores: team.scores,
            averageScore: parseFloat(averageScore), // Convert to number type
          };
        }

        return null; // Skip teams without both rounds
      })
      .filter((team): team is TeamDetailsWithAvgScore => team !== null); // Filter out null results
  } catch (error) {
    console.error("Error fetching team details:", error);
    return [];
  }
}
