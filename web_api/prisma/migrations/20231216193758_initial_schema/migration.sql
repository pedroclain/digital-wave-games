-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('PLAYTATON_5', 'PLAYTATON_4', 'XBOX_ONE', 'XBOX_SERIES_X', 'PC');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HORROR', 'ACTION', 'RPG', 'MMO', 'FIGHTING', 'RACING');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(31) NOT NULL,
    "email" VARCHAR(63) NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "password" VARCHAR(127) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "barcode" INTEGER NOT NULL,
    "description" VARCHAR(511),
    "imgUrl" TEXT NOT NULL,
    "price" DECIMAL(3,2) NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "platforms" "Platform"[],
    "categories" "Category"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(511) NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_barcode_key" ON "Game"("barcode");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
