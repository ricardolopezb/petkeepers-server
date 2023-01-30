/*
  Warnings:

  - The primary key for the `user_user_reviews_traits` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `traitId` on the `user_user_reviews_traits` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traitName` to the `user_user_reviews_traits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_user_reviews_traits" DROP CONSTRAINT "user_user_reviews_traits_traitId_fkey";

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user_user_reviews_traits" DROP CONSTRAINT "user_user_reviews_traits_pkey",
DROP COLUMN "traitId",
ADD COLUMN     "traitName" TEXT NOT NULL,
ADD CONSTRAINT "user_user_reviews_traits_pkey" PRIMARY KEY ("userUserReviewId", "traitName");

-- AddForeignKey
ALTER TABLE "user_user_reviews_traits" ADD CONSTRAINT "user_user_reviews_traits_traitName_fkey" FOREIGN KEY ("traitName") REFERENCES "traits"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
