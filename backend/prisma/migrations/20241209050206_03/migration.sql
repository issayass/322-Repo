/*
  Warnings:

  - You are about to drop the `_OrderToOrderItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToOrderItem" DROP CONSTRAINT "_OrderToOrderItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToOrderItem" DROP CONSTRAINT "_OrderToOrderItem_B_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrderToOrderItem";

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
