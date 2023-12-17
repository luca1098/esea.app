-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_boatId_fkey";

-- CreateTable
CREATE TABLE "_BoatToService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoatToService_AB_unique" ON "_BoatToService"("A", "B");

-- CreateIndex
CREATE INDEX "_BoatToService_B_index" ON "_BoatToService"("B");

-- AddForeignKey
ALTER TABLE "_BoatToService" ADD CONSTRAINT "_BoatToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Boat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoatToService" ADD CONSTRAINT "_BoatToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
