/*
  Warnings:

  - The values [superadmin] on the enum `USER_ROLES` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "USER_ROLES_new" AS ENUM ('super_admin', 'admin', 'customer');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "USER_ROLES_new" USING ("role"::text::"USER_ROLES_new");
ALTER TYPE "USER_ROLES" RENAME TO "USER_ROLES_old";
ALTER TYPE "USER_ROLES_new" RENAME TO "USER_ROLES";
DROP TYPE "USER_ROLES_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'customer';
COMMIT;
