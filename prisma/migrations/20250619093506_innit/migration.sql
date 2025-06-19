/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `booking_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_addressId_fkey`;

-- DropIndex
DROP INDEX `booking_userId_fkey` ON `booking`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `image` VARCHAR(255) NULL,
    `companyName` VARCHAR(255) NULL,
    `addressId` INTEGER NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
