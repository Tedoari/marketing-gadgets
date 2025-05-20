-- AlterTable
ALTER TABLE `booking` ADD COLUMN `orderStatus` ENUM('pending', 'confirmed', 'send', 'arrived', 'cancelled') NOT NULL DEFAULT 'pending';
