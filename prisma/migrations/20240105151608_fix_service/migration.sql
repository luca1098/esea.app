/*
  Warnings:

  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "price";

-- CreateTable
CREATE TABLE "Duration" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "price" DOUBLE PRECISION DEFAULT 0,
    "serviceId" TEXT,

    CONSTRAINT "Duration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Duration_id_key" ON "Duration"("id");

-- AddForeignKey
ALTER TABLE "Duration" ADD CONSTRAINT "Duration_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
