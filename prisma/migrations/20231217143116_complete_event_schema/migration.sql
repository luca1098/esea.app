-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "note" TEXT,
ADD COLUMN     "people" INTEGER,
ALTER COLUMN "clientId" DROP NOT NULL;
