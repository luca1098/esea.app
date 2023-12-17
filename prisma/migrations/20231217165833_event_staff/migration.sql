/*
  Warnings:

  - You are about to drop the column `titolo` on the `Event` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "titolo",
ADD COLUMN     "serviceId" TEXT NOT NULL;
