-- CreateEnum
CREATE TYPE "PersonaleRole" AS ENUM ('SKIPPER', 'ASSISTENT', 'COLLABORATOR', 'COFOUNDER', 'FORNITORE', 'ALTRO');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('HOUR', 'DAY', 'MONTH');

-- CreateTable
CREATE TABLE "Personale" (
    "id" TEXT NOT NULL,
    "role" "PersonaleRole",
    "name" TEXT,
    "image" TEXT,
    "salary" DOUBLE PRECISION,
    "birthday" DOUBLE PRECISION,
    "salaryType" "SalaryType",

    CONSTRAINT "Personale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personale_id_key" ON "Personale"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_skipperId_fkey" FOREIGN KEY ("skipperId") REFERENCES "Personale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
