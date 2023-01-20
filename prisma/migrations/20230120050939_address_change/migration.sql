/*
  Warnings:

  - You are about to drop the column `cityId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `secondLine` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `states` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_cityId_fkey";

-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_state_or_province_id_fkey";

-- DropForeignKey
ALTER TABLE "states" DROP CONSTRAINT "states_country_id_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "cityId",
DROP COLUMN "number",
DROP COLUMN "secondLine",
DROP COLUMN "street",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "cities";

-- DropTable
DROP TABLE "countries";

-- DropTable
DROP TABLE "states";
