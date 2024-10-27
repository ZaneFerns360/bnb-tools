"use server";
import { db } from "~/server/db";
import { Team, Score } from "@prisma/client";

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
  scores: Score[];
  round1Avg: number | null;
  round2Avg: number | null;
  totalAvg: number | null;
};

export async function getAllTeamDetailsPlus(): Promise<TeamDetails[]> {
  try {
    const teams = await db.team.findMany({
      include: {
        scores: true,
      },
    });

    return teams.map((team) => {
      const round1Scores = team.scores.filter((score) => score.round === 1);
      const round2Scores = team.scores.filter((score) => score.round === 2);

      const calculateTotalScore = (scores: Score[]) =>
        scores.reduce(
          (total, score) =>
            total +
            score.design +
            score.functionality +
            score.innovation +
            score.feasibility +
            score.user_experience +
            score.scalability +
            score.demonstration,
          0,
        );

      const round1Total =
        round1Scores.length > 0 ? calculateTotalScore(round1Scores) : null;
      const round2Total =
        round2Scores.length > 0 ? calculateTotalScore(round2Scores) : null;

      const round1Avg =
        round1Total !== null ? parseFloat((round1Total / round1Scores.length).toFixed(2)) : null;
      const round2Avg =
        round2Total !== null ? parseFloat((round2Total / round2Scores.length).toFixed(2)) : null;

      let totalAvg: number | null = null;
      if (round1Avg !== null && round2Avg !== null) {
        totalAvg = parseFloat(((round1Avg + round2Avg) / 2).toFixed(2));
      }

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
        round1Avg,
        round2Avg,
        totalAvg,
      };
    });
  } catch (error) {
    console.error("Error fetching team details:", error);
    return [];
  }
}
