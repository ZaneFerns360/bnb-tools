import { getTeamDetails } from "~/app/api/teamDetails";
import {
  Coffee,
  Users,
  Layout,
  Code,
  Hash,
  User,
  Briefcase,
  Medal,
  CheckCircle,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import Link from "next/link";
import { updateTeam } from "~/app/api/updateTeam";

export default async function Page({ params }: { params: { id: string } }) {
  const teamDetails = await getTeamDetails(params.id);
  console.log(teamDetails?.checkin);

  if (!teamDetails) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 p-4">
        <Card className="border-red-400 bg-red-100/10 text-red-400">
          <CardContent className="flex items-center gap-2 p-6">
            <div className="rounded-full bg-red-400/20 p-2">
              <Users className="h-6 w-6" />
            </div>
            <p>Error: Team not found or failed to fetch details.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const teamSections = [
    {
      title: "Team Information",
      icon: Layout,
      items: [
        { label: "Team ID", value: teamDetails.id, icon: Hash },
        { label: "Team Name", value: teamDetails.name, icon: Users },
        {
          label: "Domain",
          value: teamDetails.domain ?? "Not assigned",
          icon: Briefcase,
        },
        {
          label: "Check-in Status",
          value: teamDetails.checkin ? "Checked In" : "Not Checked In",
          icon: CheckCircle,
        },
      ],
    },
    {
      title: "Team Members",
      icon: Users,
      items: [
        {
          label: "Member 1",
          value: teamDetails.member1 ?? "Not assigned",
          icon: User,
        },
        {
          label: "Member 2",
          value: teamDetails.member2 ?? "Not assigned",
          icon: User,
        },
        {
          label: "Member 3",
          value: teamDetails.member3 ?? "Null",
          icon: User,
        },
        {
          label: "Member 4",
          value: teamDetails.member4 ?? "Null",
          icon: User,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-extrabold text-transparent">
            Team Details
          </h1>
          <p className="mt-2 text-gray-400">
            Comprehensive information about the team and its members
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {teamSections.map((section) => (
            <Card
              key={section.title}
              className="border-gray-700 bg-gray-900/50 shadow-lg backdrop-blur"
            >
              <CardHeader className="border-b border-gray-700 pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-200">
                  <section.icon className="h-5 w-5 text-blue-400" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {section.items.map((item) => (
                  <DetailRow
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    icon={item.icon}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link href={`/admin/food/${teamDetails.id}`}>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-700 bg-gray-900/50 text-gray-200 hover:bg-gray-800 hover:text-white"
            >
              <Coffee className="h-4 w-4" />
              Manage Food
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | null;
  icon: React.ComponentType<any>;
}) {
  return (
    <div className="group flex items-center justify-between rounded-lg border border-transparent bg-gray-800/50 p-3 transition-colors hover:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-gray-700/50 p-2 text-gray-400 transition-colors group-hover:bg-blue-500/20 group-hover:text-blue-400">
          <Icon className="h-4 w-4" />
        </div>
        <span className="font-medium text-gray-300">{label}</span>
      </div>
      <span className="text-gray-400">{value}</span>
    </div>
  );
}
