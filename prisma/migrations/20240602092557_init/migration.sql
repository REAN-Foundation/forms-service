-- CreateTable
CREATE TABLE `file_resources` (
    `id` VARCHAR(191) NOT NULL,
    `OriginalFilename` VARCHAR(1024) NULL,
    `StorageKey` VARCHAR(1024) NOT NULL,
    `MimeType` VARCHAR(256) NOT NULL,
    `Url` VARCHAR(256) NULL,
    `Public` BOOLEAN NOT NULL DEFAULT false,
    `Size` INTEGER NULL,
    `DownloadCount` INTEGER NOT NULL DEFAULT 0,
    `Tags` JSON NULL,
    `DefaultVersionId` VARCHAR(191) NULL,
    `DefaultVersion` JSON NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `DeletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
