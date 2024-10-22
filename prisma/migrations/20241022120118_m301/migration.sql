/*
  Warnings:

  - You are about to drop the column `foodId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Food` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_foodId_fkey";

-- DropIndex
DROP INDEX "Team_foodId_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "foodId",
ADD COLUMN     "day1" JSONB,
ADD COLUMN     "day2" JSONB;

-- DropTable
DROP TABLE "Food";
