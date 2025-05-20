/*
  Warnings:

  - Made the column `endDate` on table `booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `endDate` DATETIME(3) NOT NULL,
    MODIFY `startDate` DATETIME(3) NOT NULL;
