-- CreateTable
CREATE TABLE `form_templates` (
    `id` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `CurrentVersion` INTEGER NOT NULL,
    `Type` ENUM('Survey', 'Questionnaire', 'TestPaper', 'DataCollection') NOT NULL,
    `DisplayCode` VARCHAR(191) NOT NULL,
    `OwnerUserId` VARCHAR(191) NOT NULL,
    `RootSectionId` VARCHAR(191) NOT NULL,
    `DefaultSectionNumbering` BOOLEAN NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,
    `DeletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `form_sections` (
    `id` VARCHAR(191) NOT NULL,
    `ParentFormTemplateId` VARCHAR(191) NOT NULL,
    `SectionIdentifier` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `DisplayCode` VARCHAR(191) NOT NULL,
    `Sequence` VARCHAR(191) NOT NULL,
    `ParentSectionId` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,
    `DeletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` VARCHAR(191) NOT NULL,
    `ParentTemplateId` VARCHAR(191) NOT NULL,
    `ParentSectionId` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `DisplayCode` VARCHAR(191) NOT NULL,
    `ResponseType` ENUM('Text', 'Float', 'Integer', 'Boolean', 'Object', 'TextArray', 'SingleChoiceSelection', 'MultiChoiceSelection', 'File', 'Date', 'DateTime', 'Rating', 'Location', 'Range', 'None') NOT NULL,
    `Score` INTEGER NOT NULL,
    `CorrectAnswer` VARCHAR(191) NULL,
    `Hint` VARCHAR(191) NULL,
    `Options` VARCHAR(191) NULL,
    `QuestionImageUrl` VARCHAR(191) NULL,
    `RangeMin` INTEGER NULL,
    `RangeMax` INTEGER NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,
    `DeletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `form_submissions` (
    `id` VARCHAR(191) NOT NULL,
    `FormTemplateId` VARCHAR(191) NOT NULL,
    `FormUrl` VARCHAR(191) NULL,
    `AnsweredByUserId` VARCHAR(191) NULL,
    `Status` ENUM('LinkShared', 'Presented', 'InProgress', 'Submitted') NOT NULL,
    `SubmissionTimestamp` DATETIME(3) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,
    `DeletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_responses` (
    `id` VARCHAR(191) NOT NULL,
    `FormSubmissionId` VARCHAR(191) NOT NULL,
    `QuestionId` VARCHAR(191) NOT NULL,
    `ResponseType` ENUM('Text', 'Float', 'Integer', 'Boolean', 'Object', 'TextArray', 'SingleChoiceSelection', 'MultiChoiceSelection', 'File', 'Date', 'DateTime', 'Rating', 'Location', 'Range', 'None') NOT NULL,
    `IntegerValue` INTEGER NULL,
    `FloatValue` DOUBLE NULL,
    `BooleanValue` BOOLEAN NULL,
    `DateTimeValue` DATETIME(3) NULL,
    `Url` VARCHAR(191) NULL,
    `FileResourceId` VARCHAR(191) NULL,
    `TextValue` VARCHAR(191) NULL,
    `SubmissionTimestamp` DATETIME(3) NULL,
    `LastSaveTimestamp` DATETIME(3) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,
    `DeletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `CountryCode` INTEGER NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Username` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,
    `DeletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_login_sessions` (
    `id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `IsActiveSession` BOOLEAN NOT NULL,
    `StartedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ValidTill` DATETIME(3) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,
    `DeletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `form_sections` ADD CONSTRAINT `form_sections_ParentFormTemplateId_fkey` FOREIGN KEY (`ParentFormTemplateId`) REFERENCES `form_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_ParentTemplateId_fkey` FOREIGN KEY (`ParentTemplateId`) REFERENCES `form_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_ParentSectionId_fkey` FOREIGN KEY (`ParentSectionId`) REFERENCES `form_sections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `form_submissions` ADD CONSTRAINT `form_submissions_FormTemplateId_fkey` FOREIGN KEY (`FormTemplateId`) REFERENCES `form_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `form_submissions` ADD CONSTRAINT `form_submissions_AnsweredByUserId_fkey` FOREIGN KEY (`AnsweredByUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_responses` ADD CONSTRAINT `question_responses_FormSubmissionId_fkey` FOREIGN KEY (`FormSubmissionId`) REFERENCES `form_submissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_responses` ADD CONSTRAINT `question_responses_QuestionId_fkey` FOREIGN KEY (`QuestionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_login_sessions` ADD CONSTRAINT `user_login_sessions_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
