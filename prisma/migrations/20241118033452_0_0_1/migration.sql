/*
  Warnings:

  - You are about to drop the column `managerID` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `managerId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_managerId_fkey";

-- DropIndex
DROP INDEX "Manager_managerID_key";

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "managerID",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "managerId";

-- CreateIndex
CREATE UNIQUE INDEX "Manager_userId_key" ON "Manager"("userId");

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
