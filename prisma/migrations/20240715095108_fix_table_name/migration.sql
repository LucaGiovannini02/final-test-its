/*
  Warnings:

  - You are about to drop the column `DatInserimento` on the `TOfferteLavoro` table. All the data in the column will be lost.
  - Added the required column `DataInserimento` to the `TOfferteLavoro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TOfferteLavoro" DROP COLUMN "DatInserimento",
ADD COLUMN     "DataInserimento" TIMESTAMP(3) NOT NULL;
