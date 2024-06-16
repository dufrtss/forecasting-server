/*
  Warnings:

  - You are about to drop the `Forecasting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Forecasting";

-- CreateTable
CREATE TABLE "forecasting" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" BIGINT NOT NULL,

    CONSTRAINT "forecasting_pkey" PRIMARY KEY ("id")
);
