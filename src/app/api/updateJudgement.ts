"use server";
import { db } from "~/server/db";
import type { Score } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateJudgement(
  scoreId: string,
  rating: {
    judge: string;
    round: number;
    design: string;
    functionality: string;
    innovation: string;
    feasibility: string;
    user_experience: string;
    scalability: string;
    demonstration: string;
  },
): Promise<Score | null> {
  try {
    // Update the existing score with the provided ID
    const updatedScore = await db.score.update({
      where: { id: scoreId },
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
      },
    });

    revalidatePath("/admin/dashboard");
    return updatedScore; // Return the updated score
  } catch (error) {
    console.error("Error updating score:", error);
    return null;
  }
}
