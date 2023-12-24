-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "statusId" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "EventStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
