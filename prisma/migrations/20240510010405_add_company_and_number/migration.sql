/*
  Warnings:

  - Added the required column `company` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL;