-- CreateTable
CREATE TABLE "flow" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "confidence_interval" DOUBLE PRECISION[],
    "isForecasting" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "flow_pkey" PRIMARY KEY ("id")
);
