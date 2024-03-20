/*
  Warnings:

  - Added the required column `stdOut` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "stdOut" TEXT NOT NULL;
