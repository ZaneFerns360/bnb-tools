"use server";
import { db } from "~/server/db";
import type * as client from "@prisma/client"; // Import Prisma to use InputJsonValue
import { revalidatePath } from "next/cache";

export async function changeDay2(
  teamId: string,
  newVal: client.Prisma.InputJsonValue, // Use Prisma's InputJsonValue type
): Promise<{ day2: client.Prisma.JsonValue } | null> {
  try {
    const updatedTeam = await db.team.update({
      where: { id: teamId },
      data: { day2: newVal }, // Prisma's InputJsonValue directly
      select: { day2: true }, // Select and return the updated day1 field
    });

    if (updatedTeam) {
      revalidatePath(`/admin/${teamId}`);
      return updatedTeam; // Return updated team data
    } else {
      return null; // If no team is found, return null
    }
  } catch (error) {
    console.error("Error updating day1 value:", error);
    return null;
  }
}
