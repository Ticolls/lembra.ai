-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "role" SET DEFAULT 'USER',
ALTER COLUMN "isEmailVerified" SET DEFAULT false,
ALTER COLUMN "blocked" SET DEFAULT false;
