/*
  Warnings:

  - You are about to drop the column `animalId` on the `pets` table. All the data in the column will be lost.
  - Added the required column `animalName` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_animalId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "animalId",
ADD COLUMN     "animalName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_animalName_fkey" FOREIGN KEY ("animalName") REFERENCES "animals"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
