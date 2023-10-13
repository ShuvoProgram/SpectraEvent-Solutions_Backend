/*
  Warnings:

  - You are about to drop the column `category` on the `Event` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `available_event_id` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "category",
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "facility" TEXT,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "available_event_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlots" (
    "id" TEXT NOT NULL,
    "slot_time" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSlots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_services" (
    "id" TEXT NOT NULL,
    "slot_date" TIMESTAMP(3) NOT NULL,
    "available_seats" INTEGER NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,
    "service_id" TEXT NOT NULL,
    "slot_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "available_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "available_services_slot_id_service_id_slot_date_key" ON "available_services"("slot_id", "service_id", "slot_date");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_available_event_id_fkey" FOREIGN KEY ("available_event_id") REFERENCES "available_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_services" ADD CONSTRAINT "available_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_services" ADD CONSTRAINT "available_services_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "TimeSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
