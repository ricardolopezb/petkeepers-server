/*
  Warnings:

  - You are about to drop the column `roles` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Feeling" AS ENUM ('POSSITIVE', 'NEGATIVE', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('REQUESTED', 'ACCEPTED', 'REJECTED', 'IN_PROGRESS', 'FINISHED', 'CLOSED');

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_ownerId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roles",
ADD COLUMN     "address_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Pet";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traits" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "feeling" "Feeling" NOT NULL,

    CONSTRAINT "traits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_type" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "booking_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_feeling" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "review_feeling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_roles" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "users_roles_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "secondLine" TEXT,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state_or_province_id" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country_id" TEXT NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "breed" TEXT,
    "yearOfBirth" INTEGER NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "bookingTypeId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "clientId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets_in_booking" (
    "petId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,

    CONSTRAINT "pets_in_booking_pkey" PRIMARY KEY ("bookingId","petId")
);

-- CreateTable
CREATE TABLE "user_user_reviews" (
    "id" TEXT NOT NULL,
    "receiverUserId" TEXT NOT NULL,
    "reviewerUserId" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "user_user_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_user_reviews_traits" (
    "userUserReviewId" TEXT NOT NULL,
    "traitId" TEXT NOT NULL,

    CONSTRAINT "user_user_reviews_traits_pkey" PRIMARY KEY ("userUserReviewId","traitId")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_type_key" ON "roles"("type");

-- CreateIndex
CREATE UNIQUE INDEX "traits_name_key" ON "traits"("name");

-- CreateIndex
CREATE UNIQUE INDEX "booking_type_type_key" ON "booking_type"("type");

-- CreateIndex
CREATE UNIQUE INDEX "review_feeling_type_key" ON "review_feeling"("type");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "animals_name_key" ON "animals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_or_province_id_fkey" FOREIGN KEY ("state_or_province_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_bookingTypeId_fkey" FOREIGN KEY ("bookingTypeId") REFERENCES "booking_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets_in_booking" ADD CONSTRAINT "pets_in_booking_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets_in_booking" ADD CONSTRAINT "pets_in_booking_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_user_reviews" ADD CONSTRAINT "user_user_reviews_receiverUserId_fkey" FOREIGN KEY ("receiverUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_user_reviews" ADD CONSTRAINT "user_user_reviews_reviewerUserId_fkey" FOREIGN KEY ("reviewerUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_user_reviews_traits" ADD CONSTRAINT "user_user_reviews_traits_userUserReviewId_fkey" FOREIGN KEY ("userUserReviewId") REFERENCES "user_user_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_user_reviews_traits" ADD CONSTRAINT "user_user_reviews_traits_traitId_fkey" FOREIGN KEY ("traitId") REFERENCES "traits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
