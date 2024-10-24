
'use client'
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface LeaderboardProps {
  data: {
    teamName: string;
    teamLeader: string;
    design: string;
    functionality: string;
    innovation: string;
    feasibility: string;
    userExperience: string;
    scalability: string;
    demonstration: string;
    total: string;
  }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data = [] }) => {
  return (
    <div className="mx-auto max-w-full rounded-lg bg-gray-700 p-2 shadow-lg sm:p-4 md:max-w-7xl md:p-6">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-200 sm:text-3xl md:mb-8 md:text-4xl">
        Leaderboard
      </h1>
      <div className="relative overflow-x-auto rounded-lg">
        <div className="min-w-[1000px]">
          <Table className="w-full rounded-lg bg-gray-900 shadow-lg">
            <TableHeader className="bg-gray-800">
              <TableRow>
                <TableHead className="sticky left-0 z-20 w-12 bg-gray-800 px-2 py-2 text-left text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  #
                </TableHead>
                <TableHead className="sticky left-12 z-20 min-w-[120px] bg-gray-800 px-2 py-2 text-left text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  Team Name
                </TableHead>
                <TableHead className="min-w-[120px] px-2 py-2 text-left text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  Team Leader
                </TableHead>
                <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  🎨 Design
                </TableHead>
                <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  ⚙ Functionality
                </TableHead>
                <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  💡 Innovation
                </TableHead>
                <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  📈 Feasibility
                </TableHead>
                <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  📱 User Experience
                </TableHead>
                <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  🔧 Scalability
                </TableHead>
                <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  ✔ Demonstration
                </TableHead>
                <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
                  🏆 Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-gray-300">
              {data.map((team, index) => (
                <TableRow
                  key={index}
                  className="border-b border-gray-700 transition-colors duration-200 hover:bg-gray-800"
                >
                  <TableCell className="sticky left-0 z-20 bg-gray-900 px-2 py-2 text-center text-sm md:px-4 md:py-3 md:text-base">
                    {index + 1}
                  </TableCell>
                  <TableCell className="sticky left-12 z-20 bg-gray-900 px-2 py-2 text-left text-sm font-medium md:px-4 md:py-3 md:text-base">
                    {team.teamName}
                  </TableCell>
                  <TableCell className="px-2 py-2 text-left text-sm md:px-4 md:py-3 md:text-base">
                    {team.teamLeader}
                  </TableCell>
                  <TableCell className="px-2 py-2 text-center text-sm md:px-4 md:py-3 md:text-base">
                    {team.design}
                  </TableCell>
                  <TableCell className="px-2 py-2 text-center text-sm md:px-4 md:py-3 md:text-base">
                    {team.functionality}
                  </TableCell>
                  <TableCell className="px-2 py-2 text-center text-sm md:px-4 md:py-3 md:text-base">
                    {team.innovation}
                  </TableCell>
                  <TableCell className="px-2 py-2 text-center text-sm md:px-4 md:py-3 md:text-base">
                    {team.feasibility}
                  </TableCell>
                  <TableCell className="px-2 py-2 text-center text-sm md:px-4 md:py-3 md:text-base">
                    {team.userExperience}
                  </TableCell>
                  <TableCell className="px-2 py-2 text-center text-sm md:px-4 md:py-3 md:text-base">
                    {team.scalability}
                  </TableCell>
                  <TableCell className="px-2 py-2 text-center text-sm md:px-4 md:py-3 md:text-base">
                    {team.demonstration}
                  </TableCell>
                  <TableCell className="px-2 py-2 text-center text-sm font-bold md:px-4 md:py-3 md:text-base">
                    {team.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

 export default Leaderboard;











// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "~/components/ui/table";

// interface LeaderboardProps {
//   data: {
//     teamName: string;
//     teamLeader: string;
//     design: string;
//     functionality: string;
//     innovation: string;
//     feasibility: string;
//     userExperience: string;
//     scalability: string;
//     demonstration: string;
//     total: string;
//   }[];
// }

//   return (
//     <div className="mx-auto max-w-full rounded-lg bg-gray-700 p-2 shadow-lg sm:p-4 md:max-w-7xl md:p-6">
//       <div className="relative overflow-x-auto rounded-lg">
//         <div className="min-w-[1000px]">
//           <Table className="w-full rounded-lg bg-gray-900 shadow-lg">
//             <TableHeader className="bg-gray-800">
//               <TableRow>
//                 <TableHead className="sticky left-0 z-20 w-12 bg-gray-800 px-2 py-2 text-left text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   #
//                 </TableHead>
//                 <TableHead className="sticky left-12 z-20 min-w-[120px] bg-gray-800 px-2 py-2 text-left text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   Team Name
//                 </TableHead>
//                 <TableHead className="min-w-[120px] px-2 py-2 text-left text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   Team Leader
//                 </TableHead>
//                 <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   🎨 Design
//                 </TableHead>
//                 <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   ⚙ Functionality
//                 </TableHead>
//                 <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   💡 Innovation
//                 </TableHead>
//                 <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   📈 Feasibility
//                 </TableHead>
//                 <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   📱 User Experience
//                 </TableHead>
//                 <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   🔧 Scalability
//                 </TableHead>
//                 <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   ✔ Demonstration
//                 </TableHead>
//                 <TableHead className="w-20 px-2 py-2 text-center text-sm font-semibold text-gray-300 md:px-4 md:py-3 md:text-base">
//                   🏆 Total
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
            
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// };




