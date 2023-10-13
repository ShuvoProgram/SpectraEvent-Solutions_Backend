/*
  Warnings:

  - Added the required column `image` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "image" TEXT NOT NULL;
