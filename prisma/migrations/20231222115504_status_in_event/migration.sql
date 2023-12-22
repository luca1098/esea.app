/*
  Warnings:

  - You are about to drop the `EventStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_statusId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "amount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "status" "EventStatusType" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "statusDetails" TEXT;

-- DropTable
DROP TABLE "EventStatus";
