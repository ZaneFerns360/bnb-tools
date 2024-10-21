import { getTeamDetails } from "~/app/api/teamDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const teamDetails = await getTeamDetails(params.id);

  if (!teamDetails) {
    return <div>Error: Team not found or failed to fetch details.</div>;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Team Details</h1>
      <p>
        <strong>ID:</strong> {teamDetails.id}
      </p>
      <p>
        <strong>Name:</strong> {teamDetails.name}
      </p>
      <p>
        <strong>Member 1:</strong> {teamDetails.member1 ?? "Not assigned"}
      </p>
      <p>
        <strong>Member 2:</strong> {teamDetails.member2 ?? "Not assigned"}
      </p>
      <p>
        <strong>Member 3:</strong> {teamDetails.member3 ?? "Not assigned"}
      </p>
      <p>
        <strong>Member 4:</strong> {teamDetails.member4 ?? "Not assigned"}
      </p>
      <p>
        <strong>Domain:</strong> {teamDetails.domain ?? "Not assigned"}
      </p>
      <p>
        <strong>Score ID:</strong> {teamDetails.scoreId ?? "Not assigned"}
      </p>
    </div>
  );
}
