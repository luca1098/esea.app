/*
  Warnings:

  - You are about to drop the column `companyName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyName";

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "titolo" TEXT NOT NULL,
    "from" DOUBLE PRECISION,
    "to" DOUBLE PRECISION,
    "boatId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "skipperId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
