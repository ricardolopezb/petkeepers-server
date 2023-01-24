/*
  Warnings:

  - The primary key for the `users_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `users_roles` table. All the data in the column will be lost.
  - Added the required column `roleName` to the `users_roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_roleId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_pkey",
DROP COLUMN "roleId",
ADD COLUMN     "roleName" TEXT NOT NULL,
ADD CONSTRAINT "users_roles_pkey" PRIMARY KEY ("userId", "roleName");

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
