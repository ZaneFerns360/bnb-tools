import Leaderboard from "~/app/_components/Leaderboard"; // Adjust path if needed
import { getAllTeamDetails } from "~/app/api/allTeamDetails";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "~/components/ui/tabs";

export default async function Home() {
  const round1Data = await getAllTeamDetails();
  const round2Data = await getAllTeamDetails();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 p-4">
      <div className="mb-4 flex justify-center gap-2">
        <Tabs defaultValue="round1">
          <TabsList>
            <TabsTrigger value="round1">Round 1</TabsTrigger>
            <TabsTrigger value="round2">Round 2</TabsTrigger>
          </TabsList>
          <TabsContent value="round1">
            <Leaderboard data={round1Data} value={0} />
          </TabsContent>
          <TabsContent value="round2">
            <Leaderboard data={round2Data} value={1} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}