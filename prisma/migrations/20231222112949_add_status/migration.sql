-- CreateEnum
CREATE TYPE "EventStatusType" AS ENUM ('PAYED', 'ADVANCE_PAYMENT', 'TO_PAY', 'NONE');

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_serviceId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "serviceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Personale" ALTER COLUMN "role" SET DEFAULT 'COLLABORATOR',
ALTER COLUMN "salaryType" SET DEFAULT 'DAY';

-- CreateTable
CREATE TABLE "EventStatus" (
    "id" TEXT NOT NULL,
    "value" "EventStatusType" NOT NULL DEFAULT 'NONE',
    "amount" DOUBLE PRECISION,
    "details" TEXT,

    CONSTRAINT "EventStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventStatus_id_key" ON "EventStatus"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
