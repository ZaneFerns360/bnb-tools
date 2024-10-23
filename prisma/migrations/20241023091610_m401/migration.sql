/*
  Warnings:

  - You are about to drop the column `feasibilty` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `scoreId` on the `Team` table. All the data in the column will be lost.
  - Added the required column `feasibility` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judge` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `round` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_scoreId_fkey";

-- DropIndex
DROP INDEX "Team_scoreId_key";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "feasibilty",
ADD COLUMN     "feasibility" INTEGER NOT NULL,
ADD COLUMN     "judge" TEXT NOT NULL,
ADD COLUMN     "round" INTEGER NOT NULL,
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "scoreId";

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
