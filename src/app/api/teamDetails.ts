"use server";
import { db } from "~/server/db";
import { Team } from "@prisma/client";

type TeamDetails = {
  id: string;
  name: string;
  member1: string | null;
  member2: string | null;
  member3: string | null;
  member4: string | null;
  domain: string | null;
  scoreId: string | null;
};

export async function getTeamDetails(id: string): Promise<TeamDetails | null> {
  try {
    const team = await db.team.findUnique({
      where: { id },
    });

    if (team) {
      return {
        id: team.id,
        name: team.name,
        member1: team.member1,
        member2: team.member2,
        member3: team.member3,
        member4: team.member4,
        domain: team.domain,
        scoreId: team.scoreId,
      };
    } else {
      console.error("Team not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching team details:", error);
    return null;
  }
}
