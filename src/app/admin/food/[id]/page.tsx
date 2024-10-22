import { getTeamDetails } from "~/app/api/teamDetails";
import { Coffee } from "lucide-react";
import { Button } from "~/components/ui/button";
import FoodCheckin from "~/app/_components/foodCheckin";

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
    <div className="p-4">
      <FoodCheckin teamDetails={teamDetails} />
    </div>
  );
}
