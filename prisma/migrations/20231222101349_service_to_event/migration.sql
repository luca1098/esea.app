/*
  Warnings:

  - You are about to drop the column `serviceSlug` on the `Event` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "serviceSlug",
ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
