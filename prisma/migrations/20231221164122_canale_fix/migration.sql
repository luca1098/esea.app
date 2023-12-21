-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_canaleSlug_fkey" FOREIGN KEY ("canaleSlug") REFERENCES "Canale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
