/*
  Warnings:

  - The values [PLAYTATON_5,PLAYTATON_4] on the enum `Platform` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `barcode` on the `Game` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'SANDBOX';
ALTER TYPE "Category" ADD VALUE 'ADVENTURE';
ALTER TYPE "Category" ADD VALUE 'SPORTS';

-- AlterEnum
BEGIN;
CREATE TYPE "Platform_new" AS ENUM ('PLAYSTATION_5', 'PLAYSTATION_4', 'XBOX_ONE', 'XBOX_SERIES_X', 'NINTENDO_SWITCH', 'PC');
ALTER TABLE "Game" ALTER COLUMN "platforms" TYPE "Platform_new"[] USING ("platforms"::text::"Platform_new"[]);
ALTER TYPE "Platform" RENAME TO "Platform_old";
ALTER TYPE "Platform_new" RENAME TO "Platform";
DROP TYPE "Platform_old";
COMMIT;

-- DropIndex
DROP INDEX "Game_barcode_key";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "barcode",
ALTER COLUMN "price" SET DATA TYPE DECIMAL(6,2);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
