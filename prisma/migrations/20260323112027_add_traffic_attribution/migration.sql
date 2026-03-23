-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "utmSource" TEXT;

-- CreateTable
CREATE TABLE "TrafficLog" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrafficLog_pkey" PRIMARY KEY ("id")
);
