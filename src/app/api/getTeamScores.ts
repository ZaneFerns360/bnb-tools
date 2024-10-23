"use server";
import { db } from "~/server/db";
import type { Score } from "@prisma/client";

export async function getTeamScores(teamId: string): Promise<Score[] | null> {
  try {
    // Fetch all scores associated with the teamId
    const teamScores = await db.score.findMany({
      where: {
        teamId: teamId,
      },
    });

    if (teamScores) {
      return teamScores; // Return the array of scores
    } else {
      return null; // Return null if no scores are found
    }
  } catch (error) {
    console.error("Error fetching team scores:", error);
    return null;
  }
}
