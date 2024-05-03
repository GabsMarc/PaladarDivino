/*
  Warnings:

  - You are about to drop the `custumer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `request_id_custumer_fkey`;

-- DropTable
DROP TABLE `custumer`;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `request` ADD CONSTRAINT `request_id_custumer_fkey` FOREIGN KEY (`id_custumer`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
