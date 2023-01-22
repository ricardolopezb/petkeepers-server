/*
  Warnings:

  - You are about to drop the column `type` on the `roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "roles_type_key";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");
