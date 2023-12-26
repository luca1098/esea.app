-- AlterTable
ALTER TABLE "Personale" ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "Personale" ADD CONSTRAINT "Personale_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
