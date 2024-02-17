-- CreateTable
CREATE TABLE `question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `node` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nodeType` VARCHAR(191) NOT NULL,
    `parentNodeId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `sequence` INTEGER NOT NULL,
    `queryType` VARCHAR(191) NOT NULL,
    `resolutionScore` INTEGER NOT NULL,
    `providerAssessmentCode` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `serveListNodeChildrenAtOnce` BOOLEAN NOT NULL,
    `scoringApplicable` BOOLEAN NOT NULL,
    `options` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
