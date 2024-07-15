/*
  Warnings:

  - Changed the type of `DatInserimento` on the `TOfferteLavoro` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TOfferteLavoro" DROP COLUMN "DatInserimento",
ADD COLUMN     "DatInserimento" TIMESTAMP(3) NOT NULL;
