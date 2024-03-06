-- CreateTable
CREATE TABLE `Question` (
    `id` VARCHAR(191) NOT NULL,
    `TemplateId` VARCHAR(191) NOT NULL,
    `SectionId` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `DisplayCode` VARCHAR(191) NOT NULL,
    `ResponseType` ENUM('Text', 'Float', 'Integer', 'Boolean', 'Object', 'TextArray', 'SinglehoiceSelection', 'MultiChoiceSelection', 'File', 'Date', 'DateTime', 'Rating', 'Location', 'Range', 'None') NOT NULL,
    `Score` INTEGER NOT NULL,
    `CorrectAnswer` VARCHAR(191) NOT NULL,
    `Hint` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DeletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormTemplate` (
    `id` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `CurrentVersion` INTEGER NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `DisplayCode` VARCHAR(191) NOT NULL,
    `OwnerUserId` VARCHAR(191) NOT NULL,
    `RootSectionId` VARCHAR(191) NOT NULL,
    `DefaultSectionNumbering` BOOLEAN NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DeletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormSection` (
    `id` VARCHAR(191) NOT NULL,
    `TemplateId` VARCHAR(191) NOT NULL,
    `SectionIdentifier` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `DisplayCode` VARCHAR(191) NOT NULL,
    `Sequence` INTEGER NOT NULL,
    `ParentSectionId` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DeletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionDetail` (
    `id` VARCHAR(191) NOT NULL,
    `QuestionId` VARCHAR(191) NOT NULL,
    `Option` VARCHAR(191) NOT NULL,
    `OptionSequence` INTEGER NOT NULL,
    `FileResourceId` VARCHAR(191) NOT NULL,
    `QuestionImageUrl` VARCHAR(191) NOT NULL,
    `RangeMin` INTEGER NOT NULL,
    `RangeMax` INTEGER NOT NULL,

    UNIQUE INDEX `QuestionDetail_QuestionId_key`(`QuestionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Form` (
    `id` VARCHAR(191) NOT NULL,
    `FormTemplateId` VARCHAR(191) NOT NULL,
    `FormUrl` VARCHAR(191) NOT NULL,
    `AnsweredByUserId` VARCHAR(191) NOT NULL,
    `Status` ENUM('LinkShared', 'Presented', 'InProgress', 'Submitted') NOT NULL,
    `SubmissionTimestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DeletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Response` (
    `id` VARCHAR(191) NOT NULL,
    `FormId` VARCHAR(191) NOT NULL,
    `FormTemplateId` VARCHAR(191) NOT NULL,
    `QuestionId` VARCHAR(191) NOT NULL,
    `ResponseType` ENUM('Text', 'Float', 'Integer', 'Boolean', 'Object', 'TextArray', 'SinglehoiceSelection', 'MultiChoiceSelection', 'File', 'Date', 'DateTime', 'Rating', 'Location', 'Range', 'None') NOT NULL,
    `IntegerValue` INTEGER NOT NULL,
    `FloatValue` DOUBLE NOT NULL,
    `BooleanValue` BOOLEAN NOT NULL,
    `DateTimeValue` DATETIME(3) NOT NULL,
    `Url` VARCHAR(191) NOT NULL,
    `FileResourceId` VARCHAR(191) NOT NULL,
    `TextValue` VARCHAR(191) NOT NULL,
    `SubmissionTimestamp` DATETIME(3) NOT NULL,
    `LastSaveTimestamp` DATETIME(3) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DeletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Response_FormId_key`(`FormId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `CountryCode` INTEGER NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Username` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DeletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLoginSessions` (
    `id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `IsActiveSession` BOOLEAN NOT NULL,
    `StartedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ValidTill` DATETIME(3) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DeletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_TemplateId_fkey` FOREIGN KEY (`TemplateId`) REFERENCES `FormTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_SectionId_fkey` FOREIGN KEY (`SectionId`) REFERENCES `FormSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormSection` ADD CONSTRAINT `FormSection_TemplateId_fkey` FOREIGN KEY (`TemplateId`) REFERENCES `FormTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionDetail` ADD CONSTRAINT `QuestionDetail_QuestionId_fkey` FOREIGN KEY (`QuestionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Form` ADD CONSTRAINT `Form_FormTemplateId_fkey` FOREIGN KEY (`FormTemplateId`) REFERENCES `FormTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Form` ADD CONSTRAINT `Form_AnsweredByUserId_fkey` FOREIGN KEY (`AnsweredByUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_FormId_fkey` FOREIGN KEY (`FormId`) REFERENCES `Form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_FormTemplateId_fkey` FOREIGN KEY (`FormTemplateId`) REFERENCES `FormTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_QuestionId_fkey` FOREIGN KEY (`QuestionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLoginSessions` ADD CONSTRAINT `UserLoginSessions_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
