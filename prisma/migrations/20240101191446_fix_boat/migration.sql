-- AlterTable
ALTER TABLE "Boat" ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "Boat" ADD CONSTRAINT "Boat_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
