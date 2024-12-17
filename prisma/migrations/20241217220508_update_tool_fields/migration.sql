/*
  Warnings:

  - You are about to drop the column `firstCommitDate` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `forks` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `lastCommitDate` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `Tool` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "firstCommitDate",
DROP COLUMN "forks",
DROP COLUMN "lastCommitDate",
DROP COLUMN "stars",
ADD COLUMN     "aiPowered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "chinese" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "freeTier" BOOLEAN NOT NULL DEFAULT false;
