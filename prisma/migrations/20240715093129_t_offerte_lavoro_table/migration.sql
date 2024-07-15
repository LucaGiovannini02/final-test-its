/*
  Warnings:

  - You are about to drop the `Prova` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Prova";

-- CreateTable
CREATE TABLE "TOfferteLavoro" (
    "OffertaLavoroID" SERIAL NOT NULL,
    "Titolo" TEXT NOT NULL,
    "DescrizioneBreve" TEXT NOT NULL,
    "DatInserimento" TEXT NOT NULL,
    "RetribuzioneLorda" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TOfferteLavoro_pkey" PRIMARY KEY ("OffertaLavoroID")
);
