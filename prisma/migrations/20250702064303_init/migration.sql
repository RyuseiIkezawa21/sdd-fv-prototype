-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "twitterAccount" TEXT,
    "youtubeAccount" TEXT,
    "tiktokAccount" TEXT,
    "hashtags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "broadcastStartDate" TIMESTAMP(3) NOT NULL,
    "genre" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);
