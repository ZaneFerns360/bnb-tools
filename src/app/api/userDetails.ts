"use server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { User } from "@prisma/client";

type UserDetails = {
  id: string;
  name: string | null;
  userClass: string | null;
};

export async function getUserDetails(): Promise<UserDetails | null> {
  try {
    // Fetch the user from the session
    const session = await getServerAuthSession();

    // Check if session is not null
    if (session) {
      // Fetch the user's details from the database
      const user = await db.user.findUnique({
        where: { id: session.user.id },
      });

      if (user) {
        return {
          id: user.id,
          name: user.name,
          userClass: user.userClass,
        };
      } else {
        console.error("User not found.");
        return null;
      }
    } else {
      console.error("Session not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}
