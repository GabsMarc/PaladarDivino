/*
  Warnings:

  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_id_custumer_fkey`;

-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_id_product_fkey`;

-- DropTable
DROP TABLE `requests`;

-- CreateTable
CREATE TABLE `request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_product` INTEGER NOT NULL,
    `id_custumer` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `request` ADD CONSTRAINT `request_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `request` ADD CONSTRAINT `request_id_custumer_fkey` FOREIGN KEY (`id_custumer`) REFERENCES `custumer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
