/*
  Warnings:

  - The values [ACTIVE,INACTIVE] on the enum `ClientStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELED');

-- AlterEnum
BEGIN;
CREATE TYPE "ClientStatus_new" AS ENUM ('PAID', 'PENDING', 'CANCELED');
ALTER TABLE "Client" ALTER COLUMN "status" TYPE "ClientStatus_new" USING ("status"::text::"ClientStatus_new");
ALTER TYPE "ClientStatus" RENAME TO "ClientStatus_old";
ALTER TYPE "ClientStatus_new" RENAME TO "ClientStatus";
DROP TYPE "ClientStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'INACTIVE';

-- DropEnum
DROP TYPE "PlanStatus";
