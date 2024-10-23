"use server";
import { db } from "~/server/db";
import { JSONValue } from "node_modules/superjson/dist/types";

type TeamDetails = {
  id: string;
  name: string;
  member1: string | null;
  member2: string | null;
  member3: string | null;
  member4: string | null;
  domain: string | null;
  day1: JSONValue | null;
  day2: JSONValue | null;
};

export async function getTeamDetailsByName(
  name: string,
): Promise<TeamDetails[] | null> {
  try {
    const teams = await db.team.findMany({
      where: {
        name: {
          search: name, // Full-text search for team name
        },
      },
    });

    if (teams.length > 0) {
      return teams.map((team) => ({
        id: team.id,
        name: team.name,
        member1: team.member1,
        member2: team.member2,
        member3: team.member3,
        member4: team.member4,
        domain: team.domain,
        day1: team.day1,
        day2: team.day2,
      }));
    } else {
      console.error("No teams found matching the name.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching team details by name:", error);
    return null;
  }
}
