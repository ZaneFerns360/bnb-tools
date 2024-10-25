-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "checkin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ps" INTEGER,
ADD COLUMN     "room" TEXT;
