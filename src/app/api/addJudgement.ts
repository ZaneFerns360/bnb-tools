"use server";
import { db } from "~/server/db";
import type { Score } from "@prisma/client";

export async function addJudgement(
  teamId: string,
  judge: string,
  round: number,
  design: number,
  functionality: number,
  innovation: number,
  feasibility: number,
  user_experience: number,
  scalability: number,
  demonstration: number,
): Promise<Score | null> {
  try {
    // Create a new score and attach it to the team
    const newScore = await db.score.create({
      data: {
        judge,
        round,
        design,
        functionality,
        innovation,
        feasibility,
        user_experience,
        scalability,
        demonstration,
        team: { connect: { id: teamId } }, // Connect score to team
      },
    });

    if (newScore) {
      return newScore; // Return the newly created score
    } else {
      return null; // Return null if the score creation fails
    }
  } catch (error) {
    console.error("Error creating score:", error);
    return null;
  }
}
