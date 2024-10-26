import TeamsOverview from "~/app/_components/checkin_status";
import { getAllTeamDetails } from "~/app/api/allTeamDetails";

export default async function TeamsPage() {
  const teams = await getAllTeamDetails();
  return <TeamsOverview teams={teams} />;
}
