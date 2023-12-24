-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "canaleSlug" TEXT;

-- CreateTable
CREATE TABLE "Canale" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Canale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Canale_id_key" ON "Canale"("id");
