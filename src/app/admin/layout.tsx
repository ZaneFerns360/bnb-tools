import { getUserDetails } from "../api/userDetails";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userDetails = await getUserDetails();

  if (userDetails?.userClass === "admin") {
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
