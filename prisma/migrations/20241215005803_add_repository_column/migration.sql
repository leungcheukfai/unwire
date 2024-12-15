-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('Banner', 'Homepage', 'ToolPage', 'BlogPost', 'All');

-- CreateEnum
CREATE TYPE "ToolStatus" AS ENUM ('Draft', 'Scheduled', 'Published', 'Deleted');

-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT NOT NULL,
    "faviconUrl" TEXT,
    "type" "AdType" NOT NULL DEFAULT 'Homepage',
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" CITEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT,
    "content" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "forks" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "faviconUrl" TEXT,
    "screenshotUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "submitterName" TEXT,
    "submitterEmail" TEXT,
    "submitterNote" TEXT,
    "hostingUrl" TEXT,
    "discountCode" TEXT,
    "discountAmount" TEXT,
    "firstCommitDate" TIMESTAMP(3),
    "lastCommitDate" TIMESTAMP(3),
    "status" "ToolStatus" NOT NULL DEFAULT 'Draft',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "licenseId" TEXT,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alternative" (
    "id" TEXT NOT NULL,
    "name" CITEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT NOT NULL,
    "faviconUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "discountCode" TEXT,
    "discountAmount" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alternative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" CITEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "name" CITEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Topic" (
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "name" CITEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlternativeToTool" (
    "toolId" TEXT NOT NULL,
    "alternativeId" TEXT NOT NULL,

    CONSTRAINT "AlternativeToTool_pkey" PRIMARY KEY ("toolId","alternativeId")
);

-- CreateTable
CREATE TABLE "CategoryToTools" (
    "toolId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CategoryToTools_pkey" PRIMARY KEY ("toolId","categoryId")
);

-- CreateTable
CREATE TABLE "LanguageToTool" (
    "toolId" TEXT NOT NULL,
    "languageSlug" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION,

    CONSTRAINT "LanguageToTool_pkey" PRIMARY KEY ("toolId","languageSlug")
);

-- CreateTable
CREATE TABLE "TopicToTool" (
    "toolId" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,

    CONSTRAINT "TopicToTool_pkey" PRIMARY KEY ("toolId","topicSlug")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tool_slug_key" ON "Tool"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_website_key" ON "Tool"("website");

-- CreateIndex
CREATE INDEX "Tool_id_slug_idx" ON "Tool"("id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Alternative_slug_key" ON "Alternative"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Alternative_website_key" ON "Alternative"("website");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Language_slug_key" ON "Language"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "License_name_key" ON "License"("name");

-- CreateIndex
CREATE UNIQUE INDEX "License_slug_key" ON "License"("slug");
