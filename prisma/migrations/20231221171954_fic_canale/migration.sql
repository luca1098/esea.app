/*
  Warnings:

  - The primary key for the `Canale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `slug` on the `Canale` table. All the data in the column will be lost.
  - You are about to drop the column `canaleSlug` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Canale` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Canale` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_canaleSlug_fkey";

-- DropIndex
DROP INDEX "Canale_slug_key";

-- AlterTable
ALTER TABLE "Canale" DROP CONSTRAINT "Canale_pkey",
DROP COLUMN "slug",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Canale_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "canaleSlug",
ADD COLUMN     "canaleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Canale_id_key" ON "Canale"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_canaleId_fkey" FOREIGN KEY ("canaleId") REFERENCES "Canale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
