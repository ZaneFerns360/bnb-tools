import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session) {
    const userName = session.user?.name;

    // Check if the user name starts with "judge"
    if (userName && !userName.toLowerCase().startsWith("judge")) {
      redirect("/"); // Redirect if the name does not start with "judge"
    }
  } else {
    redirect("/"); // Redirect if there's no session
  }

  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
}
