/*
  Warnings:

  - Added the required column `name` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `name` VARCHAR(255) NOT NULL,
    MODIFY `measurements` VARCHAR(255) NULL,
    MODIFY `weight` DOUBLE NULL;
