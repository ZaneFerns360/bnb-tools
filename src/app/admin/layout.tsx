import { getUserDetails } from "../api/userDetails";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (session) {
  } else {
    redirect("/");
  }

  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
}
