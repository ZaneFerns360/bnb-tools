-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userClass" TEXT;

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "value" INTEGER,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "member1" TEXT,
    "member2" TEXT,
    "member3" TEXT,
    "member4" TEXT,
    "domain" TEXT,
    "scoreId" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_scoreId_key" ON "Team"("scoreId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE SET NULL ON UPDATE CASCADE;
