/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `boatId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `serviceSlug` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "serviceId",
ADD COLUMN     "serviceSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "boatId";
