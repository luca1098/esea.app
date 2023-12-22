/*
  Warnings:

  - You are about to drop the column `email` on the `Personale` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Personale` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Personale_email_key";

-- AlterTable
ALTER TABLE "Personale" DROP COLUMN "email",
DROP COLUMN "password";
