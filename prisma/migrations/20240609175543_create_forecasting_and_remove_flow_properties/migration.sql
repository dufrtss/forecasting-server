/*
  Warnings:

  - You are about to drop the column `confidence_interval` on the `flow` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `flow` table. All the data in the column will be lost.
  - You are about to drop the column `is_forecasting` on the `flow` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `flow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flow" DROP COLUMN "confidence_interval",
DROP COLUMN "date",
DROP COLUMN "is_forecasting",
ADD COLUMN     "timestamp" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "Forecasting" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" BIGINT NOT NULL,

    CONSTRAINT "Forecasting_pkey" PRIMARY KEY ("id")
);
