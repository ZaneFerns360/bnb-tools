/*
  Warnings:

  - You are about to drop the column `value` on the `Score` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[foodId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `demonstration` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `design` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feasibilty` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `functionality` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `innovation` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scalability` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_experience` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "value",
ADD COLUMN     "demonstration" INTEGER NOT NULL,
ADD COLUMN     "design" INTEGER NOT NULL,
ADD COLUMN     "feasibilty" INTEGER NOT NULL,
ADD COLUMN     "functionality" INTEGER NOT NULL,
ADD COLUMN     "innovation" INTEGER NOT NULL,
ADD COLUMN     "scalability" INTEGER NOT NULL,
ADD COLUMN     "user_experience" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "foodId" TEXT,
ADD COLUMN     "number" INTEGER NOT NULL DEFAULT 2;

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "breakfast1" INTEGER NOT NULL DEFAULT 0,
    "lunch1" INTEGER NOT NULL DEFAULT 0,
    "snack1" INTEGER NOT NULL DEFAULT 0,
    "dinner1" INTEGER NOT NULL DEFAULT 0,
    "breakfast2" INTEGER NOT NULL DEFAULT 0,
    "lunch2" INTEGER NOT NULL DEFAULT 0,
    "snack2" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_foodId_key" ON "Team"("foodId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE SET NULL ON UPDATE CASCADE;
