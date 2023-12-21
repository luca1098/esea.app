/*
  Warnings:

  - The primary key for the `Canale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Canale` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Canale` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_canaleSlug_fkey";

-- DropIndex
DROP INDEX "Canale_id_key";

-- AlterTable
ALTER TABLE "Canale" DROP CONSTRAINT "Canale_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Canale_pkey" PRIMARY KEY ("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Canale_slug_key" ON "Canale"("slug");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_canaleSlug_fkey" FOREIGN KEY ("canaleSlug") REFERENCES "Canale"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
