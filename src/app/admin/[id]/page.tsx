import { getTeamDetails } from "~/app/api/teamDetails";
import { Coffee } from "lucide-react";
import { Button } from "~/components/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const teamDetails = await getTeamDetails(params.id);

  if (!teamDetails) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg border border-red-400 bg-red-100 p-6 text-red-700 shadow-md">
          <p>Error: Team not found or failed to fetch details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-lg rounded-lg bg-gray-900 p-6 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-extrabold text-white">
          Team Details
        </h1>
        <div className="space-y-4">
          <DetailRow label="ID:" value={teamDetails.id} />
          <DetailRow label="Name:" value={teamDetails.name} />
          <DetailRow
            label="Member 1:"
            value={teamDetails.member1 ?? "Not assigned"}
          />
          <DetailRow
            label="Member 2:"
            value={teamDetails.member2 ?? "Not assigned"}
          />
          <DetailRow
            label="Member 3:"
            value={teamDetails.member3 ?? "Not assigned"}
          />
          <DetailRow
            label="Member 4:"
            value={teamDetails.member4 ?? "Not assigned"}
          />
          <DetailRow
            label="Domain:"
            value={teamDetails.domain ?? "Not assigned"}
          />
          <DetailRow
            label="Score ID:"
            value={teamDetails.scoreId ?? "Not assigned"}
          />
        </div>
        <div className="mt-6">
          <Button
            variant="primary"
            className="flex items-center justify-center"
          >
            <Coffee className="mr-2" />
            Food
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex justify-between text-gray-300">
      <span className="font-semibold">{label}</span>
      <span className="text-gray-400">{value}</span>
    </div>
  );
}
