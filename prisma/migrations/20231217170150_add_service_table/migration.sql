-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "boatId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_id_key" ON "Service"("id");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
