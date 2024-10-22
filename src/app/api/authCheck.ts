"use server";
import { db } from "~/server/db";

type UserDetails = {
  id: string;
  name: string;
} | null;

export async function checkUserDetails(
  username: string,
  password: string,
): Promise<UserDetails> {
  const user = await db.council.findFirst({
    where: {
      name: username,
      password: password,
    },
  });

  if (user) {
    return { id: user.id, name: user.name };
  } else {
    return null;
  }
}
