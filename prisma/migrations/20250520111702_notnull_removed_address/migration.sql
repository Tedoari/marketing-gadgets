/*
  Warnings:

  - Made the column `address` on table `booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `address` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `address` VARCHAR(255) NOT NULL;
