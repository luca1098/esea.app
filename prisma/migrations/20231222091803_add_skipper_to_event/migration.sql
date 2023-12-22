-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_skipperId_fkey" FOREIGN KEY ("skipperId") REFERENCES "Personale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
