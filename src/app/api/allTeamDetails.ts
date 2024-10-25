"use server";
import { db } from "~/server/db";
import { Team, Score } from "@prisma/client";
import { JSONValue } from "node_modules/superjson/dist/types";

type TeamDetails = {
  id: string;
  name: string;
  member1: string | null;
  member2: string | null;
  member3: string | null;
  member4: string | null;
  domain: string | null;
  number:number;
  scores: Score[]; // Include scores in the TeamDetails type
};

export async function getAllTeamDetails(): Promise<TeamDetails[]> {
  try {
    const teams = await db.team.findMany({
      include: {
        scores: true, // Include the related scores
      },
    });

    return teams.map((team) => ({
      id: team.id,
      name: team.name,
      member1: team.member1,
      member2: team.member2,
      member3: team.member3,
      member4: team.member4,
      number:team.number,
      domain: team.domain,
      scores: team.scores, // Add scores to the return object
    }));
  } catch (error) {
    console.error("Error fetching team details:", error);
    return [];
  }
}
