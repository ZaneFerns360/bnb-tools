"use server";
import { db } from "~/server/db";
import { Team } from "@prisma/client";

type UpdateTeamInput = {
  id: string;
  checkin?: boolean;
  ps?: number | null;
  room?: string | null;
  domain?: string | null;
};

export async function updateTeam(input: UpdateTeamInput): Promise<Team | null> {
  try {
    const updatedTeam = await db.team.update({
      where: { id: input.id },
      data: {
        checkin: input.checkin,
        ps: input.ps,
        room: input.room,
        domain: input.domain,
      },
    });

    if (updatedTeam) {
      return updatedTeam;
    } else {
      console.error("Failed to update team.");
      return null;
    }
  } catch (error) {
    console.error("Error updating team:", error);
    return null;
  }
}
