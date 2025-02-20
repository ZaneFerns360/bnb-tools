"use server";
import { db } from "~/server/db";
import type { Score } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addJudgement(rating: {
  teamId: string;
  judge: string;
  round: number;
  design: string;
  functionality: string;
  innovation: string;
  feasibility: string;
  user_experience: string;
  scalability: string;
  demonstration: string;
}): Promise<Score | null> {
  try {
    // Create a new score and attach it to the team
    const newScore = await db.score.create({
      data: {
        judge: rating.judge,
        round: rating.round,
        design: parseInt(rating.design),
        functionality: parseInt(rating.functionality),
        innovation: parseInt(rating.innovation),
        feasibility: parseInt(rating.feasibility),
        user_experience: parseInt(rating.user_experience),
        scalability: parseInt(rating.scalability),
        demonstration: parseInt(rating.demonstration),
        team: { connect: { id: rating.teamId } }, // Connect score to team
      },
    });
    revalidatePath("/admin/dashboard");
    return newScore; // Return the newly created score
  } catch (error) {
    console.error("Error creating score:", error);
    return null;
  }
}
