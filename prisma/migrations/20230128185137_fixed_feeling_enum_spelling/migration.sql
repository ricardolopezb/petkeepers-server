/*
  Warnings:

  - The values [POSSITIVE] on the enum `Feeling` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Feeling_new" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');
ALTER TABLE "traits" ALTER COLUMN "feeling" TYPE "Feeling_new" USING ("feeling"::text::"Feeling_new");
ALTER TYPE "Feeling" RENAME TO "Feeling_old";
ALTER TYPE "Feeling_new" RENAME TO "Feeling";
DROP TYPE "Feeling_old";
COMMIT;
